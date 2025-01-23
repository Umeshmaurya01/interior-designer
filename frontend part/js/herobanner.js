// smooth scrolling for bg img below nav

document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for background image
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.cd-bg-image');
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    }, {
        threshold: 0.1
    });
  
    // Observe hero section elements
    document.querySelectorAll('.cd-hero-section *').forEach(el => {
        observer.observe(el);
    });
  
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
  });