

//main secton below  hero section
// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize counters
  initCounters();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize modal handlers
  initModalHandlers();
});

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
          current += step;
          if (current < target) {
              counter.textContent = Math.round(current);
              requestAnimationFrame(updateCounter);
          } else {
              counter.textContent = target;
          }
      };
      
      // Start counter when element is in view
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  updateCounter();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
  });
}

// Video Modal Functions
function vidOpenVideoModal() {
  const modal = document.getElementById('vid-videoModal');
  const iframe = document.getElementById('vid-videoIframe');
  const videoUrl = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0';
  
  iframe.src = videoUrl;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Fade in animation
  requestAnimationFrame(() => {
      modal.style.opacity = '1';
  });
}

function vidCloseVideoModal() {
  const modal = document.getElementById('vid-videoModal');
  const iframe = document.getElementById('vid-videoIframe');
  
  modal.style.opacity = '0';
  
  setTimeout(() => {
      modal.style.display = 'none';
      iframe.src = '';
      document.body.style.overflow = 'auto';
  }, 300);
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.vid-content, .vid-image-section');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px'
  });
  
  elements.forEach(element => observer.observe(element));
}

// Modal Handlers
function initModalHandlers() {
  const modal = document.getElementById('vid-videoModal');
  
  // Close modal on outside click
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          vidCloseVideoModal();
      }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          vidCloseVideoModal();
      }
  });
}

// Smooth scroll for anchor links
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
















// three div sec visiblity
document.addEventListener("DOMContentLoaded", function() {
  const furnitureBoxes = document.querySelectorAll(".furniture-service-box");

  const revealOnScroll = () => {
      furnitureBoxes.forEach(box => {
          const boxPosition = box.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;

          if (boxPosition < screenPosition) {
              box.style.opacity = "1";
              box.style.transform = "translateY(0)";
          }
      });
  };

  // Initial check to show elements already in view
  revealOnScroll();

  // Event listener for scroll to trigger the reveal
  window.addEventListener("scroll", revealOnScroll);
});

























// Observe the hero section and hero text for animations
const heroSection = document.querySelector('.hero-section');
const heroText = document.querySelector('.hero-text');

observer.observe(heroSection);
observer.observe(heroText);





































