// components.js - Loads shared navbar & footer, handles theme, active nav, mobile menu
// Production-ready vanilla JS. No frameworks.

(function() {
  'use strict';

  const SITE_URL = 'https://weirdhub.site';

  // Load Navbar
  async function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    try {
      const res = await fetch('/components/navbar.html');
      if (!res.ok) throw new Error('Failed to load navbar');
      const html = await res.text();
      placeholder.innerHTML = html;

      // After load: init mobile menu, active links, theme button
      initMobileMenu();
      highlightActiveNav();
      initThemeToggle();
    } catch (err) {
      console.error('Navbar load error:', err);
      // Fallback simple nav
      placeholder.innerHTML = `
        <nav class="navbar"><div class="container navbar-inner">
          <a href="${SITE_URL}/" class="logo"><span class="logo-text">WeirdHub</span></a>
          <ul class="nav-links">
            <li><a href="${SITE_URL}/">Home</a></li>
            <li><a href="${SITE_URL}/blogs/">Blogs</a></li>
            <li><a href="${SITE_URL}/about/">About</a></li>
            <li><a href="${SITE_URL}/contact-us/">Contact</a></li>
          </ul>
        </div></nav>`;
    }
  }

  // Load Footer
  async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
      const res = await fetch('/components/footer.html');
      if (!res.ok) throw new Error('Failed to load footer');
      const html = await res.text();
      placeholder.innerHTML = html;
    } catch (err) {
      console.error('Footer load error:', err);
    }
  }

  // Mobile hamburger menu
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('active', isOpen);
    });

    // Close menu when clicking a link (mobile)
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (links.classList.contains('open')) {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('active');
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      }
    });
  }

  // Highlight active navigation link
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Exact match or starts with for subpages
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Theme (Light/Dark) System Preference + Toggle + localStorage
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const html = document.documentElement;
    
    // Set initial theme from localStorage or system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Toggle button click
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update aria for accessibility
      toggleBtn.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });

    // Listen for system changes (if no manual override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });

    // Keyboard support
    toggleBtn.setAttribute('aria-label', html.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Initialize everything when DOM ready
  function init() {
    loadNavbar();
    loadFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging if needed
  window.WeirdHub = { loadNavbar, loadFooter };
})();