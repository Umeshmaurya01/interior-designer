// Enhanced Footer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer elements
    const footer = document.querySelector('.ftr-master-wrapper');
    const sections = document.querySelectorAll('.ftr-brand-section, .ftr-quick-access, .ftr-services-showcase, .ftr-connect-section');
    const scrollTopBtn = document.getElementById('ftrScrollTop');
    const newsletterForm = document.getElementById('ftr-subscribe-form');
    
    // Particle Animation Setup
    function createParticles() {
        const particleContainer = document.querySelector('.ftr-animated-bg');
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'ftr-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 15}s`;
            particleContainer.appendChild(particle);
        }
    }

    // Intersection Observer for Footer Sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation to child elements
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animation = `sectionFadeIn 0.6s ease-out ${index * 0.1}s forwards`;
                });
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Scroll to Top Functionality
    function handleScroll() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Smooth Scroll Function
    function smoothScroll(target, duration) {
        const targetPosition = target === 0 ? 0 : target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Newsletter Form Handler
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('.ftr-email-input').value;
        const response = form.querySelector('.ftr-form-response');
        const submitBtn = form.querySelector('.ftr-submit-btn');

        // Disable form during submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Simulate API call
        setTimeout(() => {
            response.innerHTML = `
                <div class="ftr-success-message">
                    <i class="fas fa-check-circle"></i>
                    Thank you for subscribing!
                </div>
            `;
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="ftr-btn-text">Subscribe</span><i class="fas fa-paper-plane"></i>';

            // Clear success message after 5 seconds
            setTimeout(() => {
                response.innerHTML = '';
            }, 5000);
        }, 1500);
    }

    // Social Media Hover Effects
    function initializeSocialHoverEffects() {
        const socialLinks = document.querySelectorAll('.ftr-social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });

            link.addEventListener('mouseleave', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0)';
            });
        });
    }

    // Quick Links Hover Animation
    function initializeQuickLinksAnimation() {
        const quickLinks = document.querySelectorAll('.ftr-quick-link, .ftr-service-item');
        
        quickLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'translateX(5px) scale(1.2)';
            });

            link.addEventListener('mouseleave', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'translateX(0) scale(1)';
            });
        });
    }

    // Contact Items Animation
    function initializeContactAnimation() {
        const contactItems = document.querySelectorAll('.ftr-contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'scale(1.2)';
                icon.style.backgroundColor = '#3498db';
                icon.style.color = '#ffffff';
            });

            item.addEventListener('mouseleave', (e) => {
                const icon = e.target.querySelector('i');
                icon.style.transform = 'scale(1)';
                icon.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                icon.style.color = '#3498db';
            });
        });
    }

    // Initialize Waves Animation
    function initializeWaves() {
        const waves = document.querySelectorAll('.ftr-wave-1, .ftr-wave-2');
        waves.forEach(wave => {
            wave.style.animation = `waveMove ${15 + Math.random() * 5}s linear infinite`;
        });
    }

    // Initialize all functionality
    function init() {
        // Create particle effects
        createParticles();

        // Initialize observers
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            sectionObserver.observe(section);
        });

        // Event listeners
        window.addEventListener('scroll', handleScroll);
        scrollTopBtn.addEventListener('click', () => smoothScroll(0, 1000));
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);

        // Initialize animations
        initializeSocialHoverEffects();
        initializeQuickLinksAnimation();
        initializeContactAnimation();
        initializeWaves();

        // Show footer
        setTimeout(() => {
            footer.classList.add('visible');
        }, 100);
    }

    // Add custom styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .ftr-success-message {
            color: #2ecc71;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            margin-top: 10px;
        }

        .ftr-success-message i {
            animation: iconSpin 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Initialize everything
    init();
});