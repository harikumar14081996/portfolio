import React from 'react';

export const AIIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle className="icon-ai-core" cx="50" cy="50" r="15" fill="var(--accent-primary)" fillOpacity="0.8" />
    <path className="icon-ai-ring" d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 20" />
    <circle cx="50" cy="15" r="4" fill="var(--accent-primary)" />
    <circle cx="85" cy="50" r="4" fill="var(--accent-primary)" />
    <circle cx="50" cy="85" r="4" fill="var(--accent-primary)" />
    <circle cx="15" cy="50" r="4" fill="var(--accent-primary)" />
  </svg>
);

export const AutomationIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="icon-auto-line" d="M10 50H90" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
    <g className="icon-auto-gear">
      <circle cx="50" cy="50" r="12" stroke="var(--accent-primary)" strokeWidth="4" />
      <path d="M50 30V35M50 65V70M30 50H35M65 50H70" stroke="var(--accent-primary)" strokeWidth="4" strokeLinecap="round" />
    </g>
    <circle cx="50" cy="50" r="4" fill="var(--accent-primary)" />
  </svg>
);

export const MarketingIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect className="icon-market-bar icon-market-bar-1" x="25" y="60" width="10" height="20" rx="2" fill="var(--accent-primary)" />
    <rect className="icon-market-bar icon-market-bar-2" x="45" y="40" width="10" height="40" rx="2" fill="var(--accent-primary)" />
    <rect className="icon-market-bar icon-market-bar-3" x="65" y="20" width="10" height="60" rx="2" fill="var(--accent-primary)" />
    <path d="M15 85H85" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FrontendIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="20" width="70" height="60" rx="4" stroke="var(--text-secondary)" strokeWidth="2" />
    <rect x="15" y="20" width="70" height="15" rx="4" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
    <circle cx="25" cy="27.5" r="2" fill="#ff5f56" />
    <circle cx="33" cy="27.5" r="2" fill="#ffbd2e" />
    <circle cx="41" cy="27.5" r="2" fill="#27c93f" />
    <circle className="icon-fe-atom" cx="50" cy="55" r="8" stroke="var(--accent-primary)" strokeWidth="2" />
    <ellipse className="icon-fe-orbit-1" cx="50" cy="55" rx="18" ry="6" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" />
    <ellipse className="icon-fe-orbit-2" cx="50" cy="55" rx="18" ry="6" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" transform="rotate(60, 50, 55)" />
    <ellipse className="icon-fe-orbit-3" cx="50" cy="55" rx="18" ry="6" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" transform="rotate(120, 50, 55)" />
  </svg>
);

export const BackendIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect className="icon-be-node icon-be-node-1" x="20" y="40" width="12" height="20" rx="2" stroke="var(--accent-primary)" strokeWidth="2" />
    <rect className="icon-be-node icon-be-node-2" x="44" y="40" width="12" height="20" rx="2" stroke="var(--accent-primary)" strokeWidth="2" />
    <rect className="icon-be-node icon-be-node-3" x="68" y="40" width="12" height="20" rx="2" stroke="var(--accent-primary)" strokeWidth="2" />
    <path className="icon-be-flow" d="M32 50H44M56 50H68" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 4" />
    <circle className="icon-be-pulse" cx="26" cy="50" r="3" fill="var(--accent-primary)" />
  </svg>
);

export const DatabaseIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="30" rx="25" ry="10" stroke="var(--accent-primary)" strokeWidth="2" />
    <path d="M25 30V50C25 55.5 36.2 60 50 60C63.8 60 75 55.5 75 50V30" stroke="var(--accent-primary)" strokeWidth="2" />
    <path d="M25 50V70C25 75.5 36.2 80 50 80C63.8 80 75 75.5 75 70V50" stroke="var(--accent-primary)" strokeWidth="2" />
    <ellipse className="icon-db-ring" cx="50" cy="70" rx="25" ry="10" stroke="var(--accent-primary)" strokeWidth="1" fill="var(--accent-primary)" fillOpacity="0.1" />
  </svg>
);

export const MobileIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="15" width="40" height="70" rx="6" stroke="var(--text-secondary)" strokeWidth="2" />
    <rect x="33" y="18" width="34" height="64" rx="4" fill="var(--bg-tertiary)" />
    <circle cx="50" cy="78" r="3" stroke="var(--text-muted)" strokeWidth="1" />
    <rect className="icon-mob-content" x="38" y="25" width="24" height="4" rx="1" fill="var(--accent-primary)" fillOpacity="0.4" />
    <rect className="icon-mob-content" x="38" y="32" width="18" height="4" rx="1" fill="var(--accent-primary)" fillOpacity="0.4" />
    <rect className="icon-mob-content" x="38" y="39" width="24" height="15" rx="2" fill="var(--accent-primary)" fillOpacity="0.4" />
  </svg>
);

export const CloudIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="icon-cloud-base" d="M20 65C20 56.7 26.7 50 35 50C36.8 50 38.5 50.3 40.1 50.9C43.5 44.4 50.2 40 58 40C68.5 40 77 48.5 77 59C77 59.7 77 60.3 76.9 61C82.1 61.9 86 66.5 86 72C86 78.1 81.1 83 75 83H30C24.5 83 20 78.5 20 73V65Z" stroke="var(--accent-primary)" strokeWidth="2" />
    <path className="icon-cloud-arrow" d="M53 65L53 50M53 50L48 55M53 50L58 55" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LogicIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="15" y="60" fontSize="40" fontFamily="JetBrains Mono" fill="var(--accent-primary)" fontWeight="bold">{"{"}</text>
    <text x="65" y="60" fontSize="40" fontFamily="JetBrains Mono" fill="var(--accent-primary)" fontWeight="bold">{"}"}</text>
    <rect className="icon-logic-cursor" x="48" y="35" width="2" height="30" fill="var(--accent-primary)" />
  </svg>
);

export const ResearchIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="var(--text-muted)" strokeWidth="1" />
    <circle cx="50" cy="50" r="10" stroke="var(--accent-primary)" strokeWidth="2" />
    <line x1="50" y1="20" x2="50" y2="40" stroke="var(--text-muted)" strokeWidth="1" />
    <line x1="50" y1="60" x2="50" y2="80" stroke="var(--text-muted)" strokeWidth="1" />
    <line x1="20" y1="50" x2="40" y2="50" stroke="var(--text-muted)" strokeWidth="1" />
    <line x1="60" y1="50" x2="80" y2="50" stroke="var(--text-muted)" strokeWidth="1" />
    <rect className="icon-res-scanner" x="15" y="15" width="70" height="2" fill="var(--accent-primary)" />
  </svg>
);

export const IntegrationsIcon = () => (
  <svg className="animated-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="8" fill="var(--accent-primary)" />
    <circle className="icon-int-node icon-int-node-1" cx="50" cy="20" r="4" fill="var(--text-muted)" />
    <circle className="icon-int-node icon-int-node-2" cx="80" cy="50" r="4" fill="var(--text-muted)" />
    <circle className="icon-int-node icon-int-node-3" cx="50" cy="80" r="4" fill="var(--text-muted)" />
    <circle className="icon-int-node icon-int-node-4" cx="20" cy="50" r="4" fill="var(--text-muted)" />
    <path className="icon-int-line icon-int-line-1" d="M50 42V24" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="2 4" />
    <path className="icon-int-line icon-int-line-2" d="M58 50H76" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="2 4" />
    <path className="icon-int-line icon-int-line-3" d="M50 58V76" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="2 4" />
    <path className="icon-int-line icon-int-line-4" d="M42 50H24" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="2 4" />
  </svg>
);
