-- Visitor analytics schema for Cloudflare D1

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Visitor tracking table
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  city TEXT,
  region TEXT,
  country TEXT,
  latitude REAL,
  longitude REAL,
  timezone TEXT,
  page_section TEXT,
  user_agent TEXT,
  referrer TEXT,
  device_type TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_country ON visits(country);
CREATE INDEX IF NOT EXISTS idx_visits_region ON visits(region);
CREATE INDEX IF NOT EXISTS idx_visits_city ON visits(city);
CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp);

-- Client inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at);

-- Client reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  business_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'hidden'
  is_featured BOOLEAN DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Global configuration table (for social links, etc.)
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);


