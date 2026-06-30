/**
 * WEIRDHUB - Theme Controller
 * Currently fixed to bright clean theme.
 * Placeholder for future accent color or reduced-motion preferences.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect user reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    // Disable any potential heavy transitions globally if needed
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Future: Accent color switcher or saved preference could go here
  // Currently locked to premium bright palette defined in CSS
  console.log('%c[WeirdHub] Bright clean theme initialized. All sharp edges. No dark mode.', 'color:#64748b; font-size:9px');
});