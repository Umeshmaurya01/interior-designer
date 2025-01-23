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














// project section

document.addEventListener("DOMContentLoaded", function() {
    // Initialize elements and variables
    const filters = document.querySelectorAll(".bd-btnsss li");
    const cards = document.querySelectorAll(".bd-gallery .bd-card");
    const filterContainer = document.querySelector('.bd-btnsss ul');
    let currentFilter = "all";
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let startScrollLeft = 0;
    let isScrolling = false;

    // Utility function for animation delays
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Check device type
    const isMobile = () => window.innerWidth <= 768;
    const isTablet = () => window.innerWidth <= 991 && window.innerWidth > 768;

    // Enhanced filtering function with improved animations
    async function filterProjects(filterValue) {
        if (isAnimating || currentFilter === filterValue) return;
        isAnimating = true;
        currentFilter = filterValue;

        // Update active state and scroll into view
        filters.forEach(filter => {
            const isActive = filter.getAttribute("data-filter") === filterValue;
            filter.classList.toggle("active", isActive);
            
            if (isActive && (isMobile() || isTablet())) {
                const containerRect = filterContainer.getBoundingClientRect();
                const filterRect = filter.getBoundingClientRect();
                const scrollLeft = filterContainer.scrollLeft + 
                                 filterRect.left - 
                                 containerRect.left - 
                                 (containerRect.width - filterRect.width) / 2;
                
                filterContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        });

        // Animation duration based on device
        const animationDuration = isMobile() ? 300 : 500;

        // Hide all cards with staggered animation
        const hidePromises = Array.from(cards).map(async (card, index) => {
            const delay = index * 50;
            card.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            await wait(delay);
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
        });

        await Promise.all(hidePromises);
        await wait(100); // Additional wait for smooth transition

        // Show filtered cards with staggered animation
        let visibleCount = 0;
        const showPromises = Array.from(cards).map(async (card, index) => {
            const cardCategory = card.getAttribute("data-item");
            const shouldShow = filterValue === "all" || cardCategory === filterValue;

            if (shouldShow) {
                const delay = visibleCount * 100;
                visibleCount++;

                card.classList.remove("hide");
                card.style.display = "block";
                
                // Force reflow
                void card.offsetWidth;
                
                await wait(delay);
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            } else {
                card.classList.add("hide");
                card.style.display = "none";
            }
        });

        await Promise.all(showPromises);
        isAnimating = false;
    }

    // Enhanced touch handling for filter scrolling
    if (filterContainer) {
        let scrollTimeout;

        // Touch start event
        filterContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            startScrollLeft = filterContainer.scrollLeft;
            isScrolling = false;
            clearTimeout(scrollTimeout);
        }, { passive: true });

        // Touch move event
        filterContainer.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            
            const touch = e.touches[0];
            const walkX = (touch.clientX - touchStartX) * 2;
            filterContainer.scrollLeft = startScrollLeft - walkX;
            isScrolling = true;
        }, { passive: true });

        // Touch end event
        filterContainer.addEventListener('touchend', () => {
            touchStartX = 0;
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        }, { passive: true });

        // Mouse wheel horizontal scrolling for desktop
        filterContainer.addEventListener('wheel', (e) => {
            if (isTablet() || isMobile()) {
                e.preventDefault();
                filterContainer.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }

    // Enhanced filter button click handling
    filters.forEach(filter => {
        filter.addEventListener("click", function(e) {
            if (!isScrolling) {
                const filterValue = this.getAttribute("data-filter");
                filterProjects(filterValue);

                // Add click feedback animation
                this.style.transform = "scale(0.95)";
                setTimeout(() => {
                    this.style.transform = "scale(1)";
                }, 200);
            }
        });

        // Touch feedback for mobile/tablet
        filter.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });

        filter.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });

    // Enhanced card interactions
    cards.forEach(card => {
        const textElement = card.querySelector('.bd-imgText');
        const imageElement = card.querySelector('.bd-imgBox img');

        // Image loading optimization
        if (imageElement) {
            imageElement.addEventListener('load', () => {
                card.classList.add('image-loaded');
            });
        }

        // Conditional hover effects
        if (!isMobile()) {
            card.addEventListener('mouseenter', function() {
                textElement.style.transform = 'translateY(0)';
                imageElement.style.transform = 'scale(1.1)';
            });

            card.addEventListener('mouseleave', function() {
                textElement.style.transform = 'translateY(100%)';
                imageElement.style.transform = 'scale(1)';
            });
        } else {
            textElement.style.transform = 'translateY(0)';
        }
    });

    // Enhanced resize handler with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const mobile = isMobile();
            cards.forEach(card => {
                const textElement = card.querySelector('.bd-imgText');
                textElement.style.transform = mobile ? 'translateY(0)' : 'translateY(100%)';
            });
        }, 250);
    });

    // Intersection Observer for card animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                setTimeout(() => {
                    card.classList.add('bd-card-visible');
                }, Array.from(cards).indexOf(card) * 100);
                cardObserver.unobserve(card);
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => cardObserver.observe(card));

    // Initialize with all projects
    filterProjects("all");

    // Add scroll to top button functionality
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top-button';
    scrollButton.innerHTML = '↑';
    scrollButton.style.display = 'none';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 500 ? 'block' : 'none';
    }, { passive: true });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});







//instagram stats

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
});

// Add smooth loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-wrapper img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});



























