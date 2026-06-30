/**
 * WEIRDHUB - Navbar Loader
 * Loads shared navbar component and initializes menu
 */

document.addEventListener('DOMContentLoaded', async () => {
  const navbarContainer = document.getElementById('navbar');
  
  if (!navbarContainer) return;

  try {
    const response = await fetch('components/navbar.html');
    if (!response.ok) throw new Error('Failed to load navbar');
    
    const html = await response.text();
    navbarContainer.innerHTML = html;

    // Dispatch event so menu.js can initialize
    document.dispatchEvent(new CustomEvent('navbarLoaded'));
    
    // Optional: Add subtle scroll shadow to navbar
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  } catch (error) {
    console.error('Navbar loading error:', error);
    // Fallback: show basic nav if fetch fails (file:// protocol)
    navbarContainer.innerHTML = `
      <nav class="navbar">
        <div class="container nav-container">
          <a href="index.html" class="logo">
            <span class="logo-icon">WH</span>
            <span>WeirdHub</span>
          </a>
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="about.html" class="nav-link">About</a></li>
            <li><a href="projects.html" class="nav-link">Projects</a></li>
            <li><a href="blog.html" class="nav-link">Blog</a></li>
            <li><a href="contact.html" class="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
});