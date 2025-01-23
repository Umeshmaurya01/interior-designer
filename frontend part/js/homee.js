//image slider js 
document.addEventListener('DOMContentLoaded', function() {
    const bbSlider = {
        // Initialize all DOM elements
        elements: {
            container: document.querySelector('.bb-carousel-container'),
            slides: document.querySelectorAll('.bb-carousel-slide'),
            dots: document.querySelectorAll('.bb-dot'),
            prevButton: document.getElementById('bb-prevSlide'),
            nextButton: document.getElementById('bb-nextSlide'),
            currentCounter: document.querySelector('.bb-slide-counter .bb-current'),
            progressBar: document.querySelector('.bb-progress')
        },
        
        // Slider state
        state: {
            currentSlide: 0,
            slideInterval: null,
            intervalDuration: 6000,
            isTransitioning: false,
            isTouching: false,
            touchStartX: 0
        },

        init() {
            // Verify all required elements exist
            if (!this.validateElements()) {
                console.error('Required slider elements not found');
                return;
            }

            this.bindEvents();
            this.startAutoPlay();
            this.updateCounter();
            this.startProgressBar();
            this.preloadImages();
        },

        validateElements() {
            return Object.values(this.elements).every(element => 
                element && (element.length !== undefined ? element.length > 0 : true)
            );
        },

        bindEvents() {
            // Navigation buttons
            this.elements.prevButton.addEventListener('click', () => this.navigate('prev'));
            this.elements.nextButton.addEventListener('click', () => this.navigate('next'));
            
            // Dot navigation
            this.elements.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Touch events
            this.elements.container.addEventListener('touchstart', (e) => {
                this.state.isTouching = true;
                this.state.touchStartX = e.touches[0].clientX;
                this.pauseAutoPlay();
            }, { passive: true });

            this.elements.container.addEventListener('touchmove', (e) => {
                if (!this.state.isTouching) return;
                const touchEndX = e.touches[0].clientX;
                const diff = this.state.touchStartX - touchEndX;

                // Prevent vertical scrolling when swiping horizontally
                if (Math.abs(diff) > 5) {
                    e.preventDefault();
                }
            }, { passive: false });

            this.elements.container.addEventListener('touchend', (e) => {
                if (!this.state.isTouching) return;
                
                const touchEndX = e.changedTouches[0].clientX;
                const diff = this.state.touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    this.navigate(diff > 0 ? 'next' : 'prev');
                }

                this.state.isTouching = false;
                this.startAutoPlay();
            });

            // Mouse events
            this.elements.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.elements.container.addEventListener('mouseleave', () => this.startAutoPlay());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.navigate('prev');
                if (e.key === 'ArrowRight') this.navigate('next');
            });

            // Visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAutoPlay();
                } else {
                    this.startAutoPlay();
                }
            });
        },

        navigate(direction) {
            if (this.state.isTransitioning) return;
            this.state.isTransitioning = true;

            const currentSlide = this.elements.slides[this.state.currentSlide];
            let nextSlideIndex;

            if (direction === 'next') {
                nextSlideIndex = (this.state.currentSlide + 1) % this.elements.slides.length;
            } else {
                nextSlideIndex = (this.state.currentSlide - 1 + this.elements.slides.length) % this.elements.slides.length;
            }

            const nextSlide = this.elements.slides[nextSlideIndex];

            // Update classes
            currentSlide.classList.remove('bb-active');
            nextSlide.classList.add('bb-active');

            // Update dots
            this.elements.dots[this.state.currentSlide].classList.remove('bb-active');
            this.elements.dots[nextSlideIndex].classList.add('bb-active');

            // Update state
            this.state.currentSlide = nextSlideIndex;
            this.updateCounter();
            this.resetProgressBar();

            // Reset transition lock
            setTimeout(() => {
                this.state.isTransitioning = false;
            }, 800);
        },

        goToSlide(index) {
            if (index === this.state.currentSlide || this.state.isTransitioning) return;
            
            this.navigate(index > this.state.currentSlide ? 'next' : 'prev');
        },

        startAutoPlay() {
            if (this.state.slideInterval) return;
            
            this.state.slideInterval = setInterval(() => {
                this.navigate('next');
            }, this.state.intervalDuration);
        },

        pauseAutoPlay() {
            if (this.state.slideInterval) {
                clearInterval(this.state.slideInterval);
                this.state.slideInterval = null;
            }
        },

        updateCounter() {
            if (this.elements.currentCounter) {
                this.elements.currentCounter.textContent = String(this.state.currentSlide + 1).padStart(2, '0');
            }
        },

        startProgressBar() {
            this.elements.progressBar.style.width = '0%';
            this.elements.progressBar.style.transition = 'none';
            
            requestAnimationFrame(() => {
                this.elements.progressBar.style.transition = `width ${this.state.intervalDuration}ms linear`;
                this.elements.progressBar.style.width = '100%';
            });
        },

        resetProgressBar() {
            this.elements.progressBar.style.width = '0%';
            this.startProgressBar();
        },

        preloadImages() {
            Array.from(this.elements.slides).forEach(slide => {
                const bgImage = slide.querySelector('.bb-slide-image').style.backgroundImage;
                const imageUrl = bgImage.replace(/url\(['"](.+)['"]\)/, '$1');
                
                const img = new Image();
                img.src = imageUrl;
            });
        }
    };

    // Initialize slider with error handling
    try {
        bbSlider.init();
    } catch (error) {
        console.error('Error initializing slider:', error);
    }

    // Add intersection observer for performance optimization
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bbSlider.startAutoPlay();
                } else {
                    bbSlider.pauseAutoPlay();
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(bbSlider.elements.container);
});
















document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');
  
    const animateServiceCardsOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    }, { threshold: 0.1 }); // Adjust threshold as needed (0.1 = 10% visible)
  
    serviceCards.forEach(card => animateServiceCardsOnScroll.observe(card));
  });
  

















        // porject page load
 // Projects Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const filterButtons = document.querySelectorAll('.bd-filter-btn');
    const projectCards = document.querySelectorAll('.bd-project-card');
    const projectsGrid = document.querySelector('.bd-projects-grid');
    let isFiltering = false;

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Utility function to handle animations
    const animate = (element, keyframes, options) => {
        return element.animate(keyframes, {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
            ...options
        }).finished;
    };

    // Preload images for smooth transitions
    const preloadImages = () => {
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = img.src;
                document.head.appendChild(preloadLink);
            }
        });
    };

    // Filter projects function with enhanced animations
    const filterProjects = async (filterValue) => {
        if (isFiltering) return;
        isFiltering = true;

        // Add loading state
        projectsGrid.classList.add('bd-loading');

        try {
            const animations = [];

            projectCards.forEach(card => {
                const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    animations.push(
                        animate(card, [
                            { opacity: 0, transform: 'scale(0.8)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], { delay: Math.random() * 200 })
                    );
                } else {
                    animations.push(
                        animate(card, [
                            { opacity: 1, transform: 'scale(1)' },
                            { opacity: 0, transform: 'scale(0.8)' }
                        ]).then(() => {
                            card.style.display = 'none';
                        })
                    );
                }
            });

            await Promise.all(animations);
        } catch (error) {
            console.error('Error during filtering:', error);
        } finally {
            projectsGrid.classList.remove('bd-loading');
            isFiltering = false;
        }
    };

    // Handle filter button clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // Update active button state
            filterButtons.forEach(button => button.classList.remove('active'));
            this.classList.add('active');

            // Apply filter
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

    // Lightbox functionality
    const setupLightbox = () => {
        const lightboxButtons = document.querySelectorAll('.bd-overlay-btn');
        
        lightboxButtons.forEach(btn => {
            if (btn.querySelector('.fa-eye')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('.bd-card-inner');
                    const image = card.querySelector('.bd-card-image img');
                    const title = card.querySelector('.bd-overlay-content h3').textContent;
                    const description = card.querySelector('.bd-overlay-content p').textContent;
                    
                    createLightbox(image.src, title, description);
                });
            }
        });
    };

    // Create and show lightbox
    const createLightbox = (imgSrc, title, description) => {
        const lightbox = document.createElement('div');
        lightbox.className = 'bd-lightbox';
        
        lightbox.innerHTML = `
            <div class="bd-lightbox-content">
                <button class="bd-lightbox-close">&times;</button>
                <img src="${imgSrc}" alt="${title}">
                <div class="bd-lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        // Add lightbox to body
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Animate lightbox appearance
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });

        // Close lightbox functionality
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        };

        lightbox.querySelector('.bd-lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    };

    // Lazy loading for project images
    const setupLazyLoading = () => {
        const lazyImages = document.querySelectorAll('.bd-card-image img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    };

    // Scroll animation for project cards
    const setupScrollAnimation = () => {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bd-visible');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        projectCards.forEach(card => {
            animateOnScroll.observe(card);
        });
    };

    // Error handling for images
    const setupImageErrorHandling = () => {
        const projectImages = document.querySelectorAll('.bd-card-image img');
        projectImages.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'path/to/fallback-image.jpg'; // Replace with your fallback image
                this.alt = 'Image not available';
            });
        });
    };

    // Initialize all functionality
    const init = () => {
        preloadImages();
        setupLightbox();
        setupLazyLoading();
        setupScrollAnimation();
        setupImageErrorHandling();
    };

    // Run initialization
    init();

    // Handle window resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Adjust layout if needed
            projectsGrid.style.opacity = '1';
        }, 250);
    });

    // Export functions for potential external use
    window.projectsFunctionality = {
        filterProjects,
        createLightbox
    };
});
        
        



















// chooseus.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower number = faster animation

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            
            if(count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                counter.classList.add('counted', 'animate');
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Feature Items Animation
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            const icon = item.querySelector('.feature-icon');
            if(icon) {
                icon.style.transform = 'rotate(360deg)';
            }
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            const icon = item.querySelector('.feature-icon');
            if(icon) {
                icon.style.transform = 'rotate(0)';
            }
        });
    });

    // Benefit Cards Animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Hover content animation
        const hoverContent = card.querySelector('.hover-content');
        if(hoverContent) {
            card.addEventListener('mouseenter', () => {
                hoverContent.style.opacity = '1';
                hoverContent.style.transform = 'translateY(0)';
            });

            card.addEventListener('mouseleave', () => {
                hoverContent.style.opacity = '0';
                hoverContent.style.transform = 'translateY(20px)';
            });
        }
    });

    // Highlight Text Animation
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            const line = highlight.querySelector('::after');
            if(line) {
                line.style.transform = 'scaleX(1)';
            }
        });

        highlight.addEventListener('mouseleave', () => {
            const line = highlight.querySelector('::after');
            if(line) {
                line.style.transform = 'scaleX(0)';
            }
        });
    });

    // CTA Button Animation
    const ctaButton = document.querySelector('.cta-button');
    if(ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-3px)';
            const icon = ctaButton.querySelector('i');
            if(icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0)';
            const icon = ctaButton.querySelector('i');
            if(icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }

    // Scroll Progress Animation
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Parallax Effect for Section Background
    const whyChooseSection = document.querySelector('.why-choose-section');
    if(whyChooseSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            whyChooseSection.style.backgroundPosition = `center ${rate}px`;
        });
    }

    // Mobile Touch Events
    if('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        benefitCards.forEach(card => {
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.classList.add('touch-active');
            });

            card.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }

    // Performance Optimization
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsInterval = 1000 / 60; // Target 60 FPS

    function animate(currentTime) {
        const elapsed = currentTime - lastTime;

        if (elapsed > fpsInterval) {
            lastTime = currentTime - (elapsed % fpsInterval);
            
            // Perform animations here
            document.querySelectorAll('.animate-on-frame').forEach(element => {
                element.style.transform = `translateY(${Math.sin(frameCount * 0.05) * 5}px)`;
            });

            frameCount++;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Error Handling
    function handleError(error) {
        console.error('Animation Error:', error);
        // Implement fallback animations or error recovery
    }

    // Add error handling to all animations
    try {
        // Initialize all animations
        document.querySelectorAll('[data-animation]').forEach(element => {
            const animationType = element.dataset.animation;
            switch(animationType) {
                case 'fade':
                    element.style.opacity = '0';
                    element.style.transition = 'opacity 0.5s ease';
                    break;
                case 'slide':
                    element.style.transform = 'translateX(-100%)';
                    element.style.transition = 'transform 0.5s ease';
                    break;
                // Add more animation types as needed
            }
        });
    } catch(error) {
        handleError(error);
    }
});

// Cleanup function for memory management
function cleanup() {
    // Remove event listeners
    window.removeEventListener('scroll', () => {});
    
    // Clear intervals and timeouts
    const intervals = window.intervals || [];
    intervals.forEach(clearInterval);
    
    // Reset animations
    document.querySelectorAll('.animate').forEach(element => {
        element.classList.remove('animate');
    });
}

// Call cleanup when needed (e.g., page unload)
window.addEventListener('unload', cleanup);















//testimonial
// Enhanced Testimonial Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds

    // Initialize
    function init() {
        // Set initial positions
        updateSliderPosition();
        cards[0].classList.add('active');
        dots[0].classList.add('active');

        // Clone first and last slides for infinite effect
        const firstClone = cards[0].cloneNode(true);
        const lastClone = cards[cards.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.prepend(lastClone);

        // Start autoplay
        startAutoplay();
    }

    // Update slider position with smooth transition
    function updateSliderPosition(transition = true) {
        if (transition) {
            track.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
    }

    // Handle slide transition
    function handleSlideTransition(direction) {
        if (isAnimating) return;
        isAnimating = true;
        stopAutoplay();

        currentIndex += direction;
        updateSliderPosition();

        // Update active states
        updateActiveStates();

        // Handle infinite scroll
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    // Handle transition end
    function handleTransitionEnd() {
        isAnimating = false;
        startAutoplay();

        if (currentIndex === cards.length) {
            currentIndex = 0;
            updateSliderPosition(false);
        } else if (currentIndex === -1) {
            currentIndex = cards.length - 1;
            updateSliderPosition(false);
        }
    }

    // Update active states
    function updateActiveStates() {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        const normalizedIndex = ((currentIndex % cards.length) + cards.length) % cards.length;
        cards[normalizedIndex].classList.add('active');
        dots[normalizedIndex].classList.add('active');
    }

    // Start autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            handleSlideTransition(1);
        }, autoplayDelay);
    }

    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    nextButton.addEventListener('click', () => handleSlideTransition(1));
    prevButton.addEventListener('click', () => handleSlideTransition(-1));

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isAnimating) return;
            currentIndex = index;
            updateSliderPosition();
            updateActiveStates();
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause autoplay on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                handleSlideTransition(1);
            } else {
                handleSlideTransition(-1);
            }
        }
        startAutoplay();
    });

    // Initialize slider
    init();

    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all testimonial cards
    cards.forEach(card => observer.observe(card));
});















//contact
// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Animate button during submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success handling
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
            submitBtn.style.background = 'linear-gradient(45deg, #00cc66 0%, #009933 100%)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
    
    // Input animation handling
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    inputs.forEach(input => {
        // Handle focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Handle blur
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Handle input
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    document.querySelectorAll('.info-card, .contact-form-wrapper, .map-card').forEach(el => {
        observer.observe(el);
    });
});

// Map interaction handling
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container');
    
    mapContainer.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    mapContainer.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});













