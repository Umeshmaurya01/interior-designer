//blog description 1 js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 100,
        easing: 'ease-out'
    });
  
    // Image Loading Handler
    const imageHandler = {
        init() {
            const images = document.querySelectorAll('.rd-featured-image img, .rd-post-image img');
            
            images.forEach(img => {
                // Add loading state
                img.parentElement.classList.add('loading');
                
                // Store original src and set data-src
                const originalSrc = img.src;
                img.dataset.src = originalSrc;
                img.src = ''; // Clear src to prevent immediate loading
                
                this.observeImage(img);
            });
        },
  
        observeImage(img) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(img);
                            observer.unobserve(img);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            
            observer.observe(img);
        },
  
        loadImage(img) {
            img.src = img.dataset.src;
            
            img.onload = () => {
                img.parentElement.classList.remove('loading');
                img.parentElement.classList.add('loaded');
                this.animateImageIn(img);
            };
            
            img.onerror = () => {
                img.parentElement.classList.remove('loading');
                img.parentElement.classList.add('error');
                console.error(`Failed to load image: ${img.dataset.src}`);
            };
        },
  
        animateImageIn(img) {
            img.style.opacity = '0';
            requestAnimationFrame(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            });
        }
    };
  
    // Scroll Animation Handler
    const scrollHandler = {
        init() {
            this.sections = document.querySelectorAll('.rd-section');
            this.setupObserver();
            this.setupProgressBar();
        },
  
        setupObserver() {
            const options = {
                root: null,
                threshold: 0.1,
                rootMargin: '0px'
            };
  
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.animateSection(entry.target);
                    }
                });
            }, options);
  
            this.sections.forEach(section => observer.observe(section));
        },
  
        setupProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            document.body.appendChild(progressBar);
  
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        },
  
        animateSection(section) {
            const elements = section.querySelectorAll('h2, p, .rd-feature-list li, .rd-takeaway-item');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    };
  
    // Share Functionality Handler
    const shareHandler = {
        init() {
            const shareButtons = document.querySelectorAll('.rd-share-btn');
            shareButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleShare(e));
            });
        },
  
        handleShare(e) {
            e.preventDefault();
            const button = e.currentTarget;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
  
            const shareUrls = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
                pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`
            };
  
            const platform = button.classList[1];
            if (shareUrls[platform]) {
                window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            }
        }
    };
  
    // Search Handler
    const searchHandler = {
        init() {
            this.searchInput = document.querySelector('.rd-search-box input');
            if (this.searchInput) {
                this.searchInput.addEventListener('input', this.debounce(this.handleSearch, 300));
            }
        },
  
        handleSearch(e) {
            const searchTerm = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.rd-post-card');
            
            posts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm);
                post.style.display = isVisible ? 'block' : 'none';
                post.style.opacity = isVisible ? '1' : '0';
            });
        },
  
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func.apply(this, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };
  
    // Reading Time Calculator
    const readingTimeCalculator = {
        init() {
            const content = document.querySelector('.rd-content-block');
            if (content) {
                const words = content.innerText.split(/\s+/).length;
                const readingTime = Math.ceil(words / 200); // 200 words per minute
                this.updateReadingTime(readingTime);
            }
        },
  
        updateReadingTime(minutes) {
            const element = document.querySelector('.rd-reading-time');
            if (element) {
                element.innerHTML = `<i class="far fa-clock"></i> ${minutes} min read`;
            }
        }
    };
  
    // Interactive Elements Handler
    const interactionHandler = {
        init() {
            this.setupHoverEffects();
            this.setupScrollToTop();
        },
  
        setupHoverEffects() {
            const elements = document.querySelectorAll('.rd-post-card, .rd-tag, .rd-share-btn');
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-5px)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translateY(0)';
                });
            });
        },
  
        setupScrollToTop() {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'rd-scroll-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(scrollBtn);
  
            window.addEventListener('scroll', () => {
                scrollBtn.classList.toggle('show', window.scrollY > 500);
            });
  
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };
  
    // Initialize all handlers
    imageHandler.init();
    scrollHandler.init();
    shareHandler.init();
    searchHandler.init();
    readingTimeCalculator.init();
    interactionHandler.init();
  
    // Add scroll to top button styles
    const style = document.createElement('style');
    style.textContent = `
        .rd-scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--accent-gradient);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: white;
            cursor: pointer;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
  
        .rd-scroll-top.show {
            opacity: 1;
            transform: translateY(0);
        }
  
        .rd-scroll-top:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
  });