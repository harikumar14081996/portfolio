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
