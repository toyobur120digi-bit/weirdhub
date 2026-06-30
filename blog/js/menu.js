/**
 * WEIRDHUB - Menu & Navigation Controller
 * Hamburger toggle + Active page highlighting + Accessibility
 */

function initMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu open on mobile
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Keyboard accessibility for hamburger
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Set active navigation link based on current page
  setActiveNavLink();
}

function setActiveNavLink() {
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Handle root path
  if (currentPath === '' || currentPath === '/') {
    currentPath = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    const linkPath = href ? href.split('/').pop() : '';
    
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
    
    // Special case for home
    if (currentPath === 'index.html' && (linkPath === 'index.html' || href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Listen for navbar injection
document.addEventListener('navbarLoaded', () => {
  initMenu();
});

// Also try immediate init in case navbar was already present (fallback)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    const navLinks = document.getElementById('nav-links');
    if (navLinks && !navLinks.classList.contains('initialized')) {
      navLinks.classList.add('initialized');
      initMenu();
    }
  }, 150);
}