/**
 * WEIRDHUB - Footer Loader + Back to Top
 */

document.addEventListener('DOMContentLoaded', async () => {
  const footerContainer = document.getElementById('footer');
  
  if (!footerContainer) return;

  try {
    const response = await fetch('components/footer.html');
    if (!response.ok) throw new Error('Failed to load footer');
    
    const html = await response.text();
    footerContainer.innerHTML = html;

    // Initialize back to top button after footer is injected
    initBackToTop();
  } catch (error) {
    console.error('Footer loading error:', error);
    // Minimal fallback footer
    footerContainer.innerHTML = `
      <footer class="footer">
        <div class="container" style="text-align:center; padding:2rem 0;">
          <p style="color:#cbd5e1; margin:0;">© 2026 WeirdHub — Curating the wonderfully weird.</p>
        </div>
      </footer>
    `;
  }
});

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // Show/hide on scroll
  const toggleBackToTop = () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop(); // initial check

  // Click handler
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}