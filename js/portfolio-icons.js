export const skillIcons = {
  "HTML5": "html",
  "CSS3": "css",
  "JavaScript": "js",
  "UI Animation": "motion",
  "Bootstrap": "bootstrap",
  "Git & GitHub": "git",
  "Node.js": "node",
  "Express.js": "express",
  "REST APIs": "api",
  "MongoDB": "mongo",
  "Database Design": "database"
};

export function getSkillIcon(type) {
  const icons = {
    html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1.3 14.8L12 21l-5.7-3.2L5 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m9 8 .4 6 2.6.8 2.7-.9.3-3.9H9.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    css: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1.3 14.8L12 21l-5.7-3.2L5 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 8h6.5l-.4 3.2H9.7m.2 2.8h4.7l-.2 1.8-2.4.8-2.3-.8-.1-1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    js: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 9v6c0 1-.6 1.5-1.7 1.5M14.3 15.6c.4.7 1 1 1.8 1 .9 0 1.5-.4 1.5-1.1 0-.8-.5-1.1-1.7-1.6-1.2-.4-2.2-1-2.2-2.5 0-1.4 1.1-2.4 2.8-2.4 1.2 0 2 .4 2.6 1.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    motion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2.5-5.3 5.5-8 9-8 2.4 0 4.7 1.2 7 3.7M20 10c-2.5 5.3-5.5 8-9 8-2.4 0-4.7-1.2-7-3.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    bootstrap: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 8h3.3c1.7 0 2.7.8 2.7 2.1 0 .9-.4 1.6-1.3 1.9 1.2.3 1.8 1.1 1.8 2.3 0 1.7-1.2 2.7-3.3 2.7H10V8Zm2 3.6h1.1c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H12v2.2Zm0 4h1.4c1 0 1.6-.4 1.6-1.2s-.6-1.2-1.6-1.2H12v2.4Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    git: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 8-8 8-8-8 8-8Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 10.5a1.5 1.5 0 1 0 0 .1V15a1.5 1.5 0 1 0 1.7 1.5V12a1.5 1.5 0 0 0 1.3-1.5c0-.2 0-.4-.1-.6l2.1 2.1a1.5 1.5 0 1 0 .9-.9l-2.3-2.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    node: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 9.5v5m5-5v5m-5-2.5h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    express: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 10h4M8 14h8M14 10h2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    api: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 5l-2 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mongo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c2.8 3.2 4.2 6 4.2 8.6 0 3.5-1.8 6-4.2 7.4-2.4-1.4-4.2-3.9-4.2-7.4C7.8 10 9.2 7.2 12 4Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 6v13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    database: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 5l-3 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  return icons[type] || icons.code;
}
