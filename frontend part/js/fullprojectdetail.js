document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Initialize Swiper with enhanced configuration
    const gallerySwiper = new Swiper('.gallery-detai-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: "fade",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        keyboard: {
            enabled: true,
        },
        grabCursor: true,
        parallax: true,
        on: {
            init: function() {
                document.querySelector('.gallery-detai-slider').classList.remove('loading');
            }
        }
    });

    // Timeline Animation using Intersection Observer
    const timelineItems = document.querySelectorAll('.timeline-detai-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Smooth Scroll for Navigation Links
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

    // Enhanced Image Loading with Blur Effect
    const projectImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.filter = 'blur(20px)';
                img.onload = () => {
                    img.style.filter = 'blur(0)';
                    img.style.transition = 'filter 0.5s ease';
                    observer.unobserve(img);
                };
            }
        });
    });

    projectImages.forEach(img => imageObserver.observe(img));

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.project-detai-hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-detai-card p');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 30);
    }

    stats.forEach(stat => statsObserver.observe(stat));

    // Enhanced Touch Interactions
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                gallerySwiper.slideNext();
            } else {
                gallerySwiper.slidePrev();
            }
        }
    }

    // Dynamic Background Gradient
    const heroContent = document.querySelector('.hero-detai-content');
    if (heroContent) {
        heroContent.addEventListener('mousemove', (e) => {
            const rect = heroContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroContent.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                rgba(74, 144, 226, 0.1) 0%, 
                rgba(74, 144, 226, 0) 50%)`;
        });
    }

    // Responsive Navigation Handling
    function handleResponsiveLayout() {
        const width = window.innerWidth;
        if (width <= 768) {
            // Mobile-specific adjustments
            document.querySelectorAll('.meta-detai-item').forEach(item => {
                item.style.flexDirection = 'column';
                item.style.textAlign = 'center';
            });
        } else {
            // Desktop-specific adjustments
            document.querySelectorAll('.meta-detai-item').forEach(item => {
                item.style.flexDirection = 'row';
                item.style.textAlign = 'left';
            });
        }
    }

    // Initial call and event listener for resize
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);

    // Loading State Management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        initializeAnimations();
    });

    function initializeAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add('active');
        });
    }
});

// Preload Images for Smooth Transitions
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const tempImage = new Image();
        tempImage.src = img.dataset.src;
    });
}

// Initialize preloading
preloadImages();