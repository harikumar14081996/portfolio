/**
 * Portfolio Visitor Analytics — Cloudflare Worker
 * 
 * API Routes:
 *   POST /api/track              — Record a visitor (only if user consented)
 *   POST /api/auth               — Admin login (credentials from D1 database)
 *   POST /api/admin/setup         — One-time admin user creation
 *   POST /api/inquiries           — Submit client inquiry (public)
 *   GET  /api/visits              — List visits with filters (auth required)
 *   GET  /api/visits/stats        — Aggregated statistics (auth required)
 *   GET  /api/nearby              — Nearby businesses via Overpass API (auth required)
 *   GET  /api/inquiries           — List inquiries (auth required)
 *   PATCH /api/inquiries/:id      — Update inquiry status/notes (auth required)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ─── Crypto helpers ───

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function createToken(payload, secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 86400000 }));
  const data = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = btoa(String.fromCharCode(...new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  )));
  return `${data}.${sig}`;
}

async function verifyToken(token, secret) {
  try {
    const [header, body, sig] = token.split('.');
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const valid = await crypto.subtle.verify(
      'HMAC', key, Uint8Array.from(atob(sig), c => c.charCodeAt(0)),
      new TextEncoder().encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function getDeviceType(ua) {
  if (!ua) return 'unknown';
  if (/Mobile|Android|iPhone|iPad/i.test(ua)) return /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile';
  return 'desktop';
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (path.startsWith('/api/')) {
      try {
        // POST /api/track — Record visitor (public, no auth)
        if (path === '/api/track' && request.method === 'POST') {
          return await handleTrack(request, env);
        }

        // POST /api/auth — Login with DB credentials
        if (path === '/api/auth' && request.method === 'POST') {
          return await handleAuth(request, env);
        }

        // POST /api/admin/setup — One-time admin creation
        if (path === '/api/admin/setup' && request.method === 'POST') {
          return await handleAdminSetup(request, env);
        }

        // POST /api/inquiries — Submit inquiry (public)
        if (path === '/api/inquiries' && request.method === 'POST') {
          return await handleSubmitInquiry(request, env);
        }

        // ─── Protected routes ───
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');
        const secret = env.JWT_SECRET || 'portfolio-analytics-secret-key';

        const user = token ? await verifyToken(token, secret) : null;
        if (!user) {
          return json({ error: 'Unauthorized' }, 401);
        }

        if (path === '/api/visits' && request.method === 'GET') {
          return await handleGetVisits(url, env);
        }

        if (path === '/api/visits/stats' && request.method === 'GET') {
          return await handleGetStats(env);
        }

        if (path === '/api/nearby' && request.method === 'GET') {
          return await handleNearby(url);
        }

        // GET /api/inquiries — List inquiries (admin)
        if (path === '/api/inquiries' && request.method === 'GET') {
          return await handleGetInquiries(url, env);
        }

        // PATCH /api/inquiries/:id — Update inquiry (admin)
        const inquiryMatch = path.match(/^\/api\/inquiries\/(\d+)$/);
        if (inquiryMatch && request.method === 'PATCH') {
          return await handleUpdateInquiry(inquiryMatch[1], request, env);
        }

        // PATCH /api/admin/password — Change password (admin)
        if (path === '/api/admin/password' && request.method === 'PATCH') {
          return await handleChangePassword(request, env, user);
        }

        return json({ error: 'Not found' }, 404);
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};

// ─── Route Handlers ───

async function handleTrack(request, env) {
  const cf = request.cf || {};
  const body = await request.json().catch(() => ({}));
  const ua = request.headers.get('User-Agent') || '';

  await env.DB.prepare(`
    INSERT INTO visits (city, region, country, latitude, longitude, timezone, page_section, user_agent, referrer, device_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    cf.city || null,
    cf.region || null,
    cf.country || null,
    cf.latitude ? parseFloat(cf.latitude) : null,
    cf.longitude ? parseFloat(cf.longitude) : null,
    cf.timezone || null,
    body.section || 'page_load',
    ua.substring(0, 300),
    body.referrer || null,
    getDeviceType(ua)
  ).run();

  return json({ ok: true });
}

async function handleAuth(request, env) {
  const { username, password } = await request.json().catch(() => ({}));

  if (!username || !password) {
    return json({ error: 'Username and password required' }, 400);
  }

  const passwordHash = await hashPassword(password);

  const admin = await env.DB.prepare(
    'SELECT * FROM admins WHERE username = ? AND password_hash = ?'
  ).bind(username, passwordHash).first();

  if (!admin) {
    return json({ error: 'Invalid credentials' }, 401);
  }

  const secret = env.JWT_SECRET || 'portfolio-analytics-secret-key';
  const token = await createToken({ role: 'admin', username: admin.username }, secret);
  return json({ token, username: admin.username });
}

async function handleAdminSetup(request, env) {
  // Check if any admin already exists
  const existing = await env.DB.prepare('SELECT COUNT(*) as count FROM admins').first();
  if (existing.count > 0) {
    return json({ error: 'Admin already exists. Use the dashboard to manage accounts.' }, 403);
  }

  const { username, password } = await request.json().catch(() => ({}));
  if (!username || !password) {
    return json({ error: 'Username and password required' }, 400);
  }

  const passwordHash = await hashPassword(password);
  await env.DB.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)')
    .bind(username, passwordHash).run();

  return json({ ok: true, message: `Admin "${username}" created successfully` });
}

async function handleGetVisits(url, env) {
  const country = url.searchParams.get('country');
  const region = url.searchParams.get('region');
  const city = url.searchParams.get('city');
  const days = parseInt(url.searchParams.get('days') || '30');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '200'), 500);

  let query = 'SELECT * FROM visits WHERE timestamp >= datetime("now", ?)';
  const params = [`-${days} days`];

  if (country) { query += ' AND country = ?'; params.push(country); }
  if (region) { query += ' AND region = ?'; params.push(region); }
  if (city) { query += ' AND city = ?'; params.push(city); }

  query += ' ORDER BY timestamp DESC LIMIT ?';
  params.push(limit);

  const { results } = await env.DB.prepare(query).bind(...params).all();

  const countries = await env.DB.prepare('SELECT DISTINCT country FROM visits WHERE country IS NOT NULL ORDER BY country').all();
  const regions = country
    ? await env.DB.prepare('SELECT DISTINCT region FROM visits WHERE country = ? AND region IS NOT NULL ORDER BY region').bind(country).all()
    : { results: [] };
  const cities = region
    ? await env.DB.prepare('SELECT DISTINCT city FROM visits WHERE region = ? AND city IS NOT NULL ORDER BY city').bind(region).all()
    : { results: [] };

  return json({
    visits: results,
    filters: {
      countries: countries.results.map(r => r.country),
      regions: regions.results.map(r => r.region),
      cities: cities.results.map(r => r.city),
    },
  });
}

async function handleGetStats(env) {
  const total = await env.DB.prepare('SELECT COUNT(*) as count FROM visits').first();
  const uniqueCities = await env.DB.prepare('SELECT COUNT(DISTINCT city) as count FROM visits WHERE city IS NOT NULL').first();
  const uniqueCountries = await env.DB.prepare('SELECT COUNT(DISTINCT country) as count FROM visits WHERE country IS NOT NULL').first();

  const topCountries = await env.DB.prepare(`
    SELECT country, COUNT(*) as count FROM visits 
    WHERE country IS NOT NULL 
    GROUP BY country ORDER BY count DESC LIMIT 10
  `).all();

  const topCities = await env.DB.prepare(`
    SELECT city, region, country, COUNT(*) as count FROM visits 
    WHERE city IS NOT NULL 
    GROUP BY city, region, country ORDER BY count DESC LIMIT 10
  `).all();

  const dailyCounts = await env.DB.prepare(`
    SELECT date(timestamp) as day, COUNT(*) as count FROM visits 
    WHERE timestamp >= datetime('now', '-30 days')
    GROUP BY day ORDER BY day
  `).all();

  const deviceBreakdown = await env.DB.prepare(`
    SELECT device_type, COUNT(*) as count FROM visits 
    GROUP BY device_type ORDER BY count DESC
  `).all();

  const sectionViews = await env.DB.prepare(`
    SELECT page_section, COUNT(*) as count FROM visits 
    WHERE page_section IS NOT NULL
    GROUP BY page_section ORDER BY count DESC
  `).all();

  return json({
    total: total.count,
    uniqueCities: uniqueCities.count,
    uniqueCountries: uniqueCountries.count,
    topCountries: topCountries.results,
    topCities: topCities.results,
    dailyCounts: dailyCounts.results,
    deviceBreakdown: deviceBreakdown.results,
    sectionViews: sectionViews.results,
  });
}

async function handleNearby(url) {
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');

  if (!lat || !lon) return json({ error: 'lat and lon required' }, 400);

  const query = `
    [out:json][timeout:10];
    (
      node["shop"](around:500,${lat},${lon});
      node["amenity"~"restaurant|cafe|bank|office|pharmacy|hospital"](around:500,${lat},${lon});
      node["office"](around:500,${lat},${lon});
      node["tourism"~"hotel|motel|guest_house"](around:500,${lat},${lon});
    );
    out body 15;
  `;

  try {
    const resp = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'PortfolioAnalytics/1.0' } }
    );
    const data = await resp.json();

    const businesses = (data.elements || []).map(el => ({
      name: el.tags?.name || 'Unnamed',
      type: el.tags?.shop || el.tags?.amenity || el.tags?.office || el.tags?.tourism || 'business',
      lat: el.lat,
      lon: el.lon,
      address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ') || null,
      phone: el.tags?.phone || null,
      website: el.tags?.website || null,
    }));

    return json({ businesses });
  } catch {
    return json({ businesses: [], error: 'Overpass API unavailable' });
  }
}

// ─── Inquiry Handlers ───

async function handleSubmitInquiry(request, env) {
  const body = await request.json().catch(() => ({}));
  const { name, email, project_type, budget, message } = body;

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are required' }, 400);
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  await env.DB.prepare(`
    INSERT INTO inquiries (name, email, project_type, budget, message)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    name.substring(0, 200),
    email.substring(0, 200),
    (project_type || '').substring(0, 100),
    (budget || '').substring(0, 50),
    message.substring(0, 5000)
  ).run();

  return json({ ok: true, message: 'Inquiry submitted successfully!' });
}

async function handleGetInquiries(url, env) {
  const status = url.searchParams.get('status');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 500);

  let query = 'SELECT * FROM inquiries';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);

  const { results } = await env.DB.prepare(query).bind(...params).all();

  // Get counts by status
  const counts = await env.DB.prepare(`
    SELECT status, COUNT(*) as count FROM inquiries GROUP BY status
  `).all();

  return json({ inquiries: results, statusCounts: counts.results });
}

async function handleUpdateInquiry(id, request, env) {
  const body = await request.json().catch(() => ({}));
  const { status, admin_notes } = body;

  const updates = [];
  const params = [];

  if (status) { updates.push('status = ?'); params.push(status); }
  if (admin_notes !== undefined) { updates.push('admin_notes = ?'); params.push(admin_notes); }

  if (updates.length === 0) {
    return json({ error: 'Nothing to update' }, 400);
  }

  params.push(id);
  await env.DB.prepare(`UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`)
    .bind(...params).run();

  return json({ ok: true });
}

async function handleChangePassword(request, env, user) {
  const { current_password, new_password } = await request.json().catch(() => ({}));

  if (!current_password || !new_password) {
    return json({ error: 'Current and new password required' }, 400);
  }

  if (new_password.length < 6) {
    return json({ error: 'New password must be at least 6 characters' }, 400);
  }

  // Verify current password
  const currentHash = await hashPassword(current_password);
  const admin = await env.DB.prepare(
    'SELECT * FROM admins WHERE username = ? AND password_hash = ?'
  ).bind(user.username, currentHash).first();

  if (!admin) {
    return json({ error: 'Current password is incorrect' }, 401);
  }

  // Update to new password
  const newHash = await hashPassword(new_password);
  await env.DB.prepare('UPDATE admins SET password_hash = ? WHERE username = ?')
    .bind(newHash, user.username).run();

  return json({ ok: true, message: 'Password changed successfully' });
}
