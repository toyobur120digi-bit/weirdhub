/**
 * WEIRDHUB - Menu & Navigation Controller
 * Hamburger toggle + Active page highlighting + Accessibility
 */

function initMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

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

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });

  setActiveNavLink();
}

function setActiveNavLink() {
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
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
    
    if (currentPath === 'index.html' && (linkPath === 'index.html' || href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('navbarLoaded', () => {
  initMenu();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    const navLinks = document.getElementById('nav-links');
    if (navLinks && !navLinks.classList.contains('initialized')) {
      navLinks.classList.add('initialized');
      initMenu();
    }
  }, 150);
}