    // Scroll Animation for Blog text Section aapearing
    const ukBlogSection = document.getElementById('ukBlogSection');

    function animateOnScroll() {
        const sectionPosition = ukBlogSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition) {
            ukBlogSection.classList.add('uk-animate');
        }
    }

    window.addEventListener('scroll', animateOnScroll);















//scroll animation for blogs main section
document.addEventListener('DOMContentLoaded', () => {
    const rdObserverOptions = {
      threshold: 0.1
    };

    const rdScrollObserver = new IntersectionObserver((rdEntries, rdObserver) => {
      rdEntries.forEach(rdEntry => {
        if (rdEntry.isIntersecting) {
          rdEntry.target.classList.add('rd-show');
          rdObserver.unobserve(rdEntry.target);
        }
      });
    }, rdObserverOptions);

    const rdTargetElements = document.querySelectorAll('.rd-card');
    rdTargetElements.forEach(rdElement => {
      rdScrollObserver.observe(rdElement);
    });
  });