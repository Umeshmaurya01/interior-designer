


/* small info section */
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.title-line, .gallery-text, .gallery-cta, .image-frame').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for gallery CTA
document.querySelector('.gallery-cta').addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.scrollIntoView({
    behavior: 'smooth'
  });
});

// Image loading optimization
const showcaseImg = document.querySelector('.showcase-img');
if (showcaseImg) {
  showcaseImg.loading = 'lazy';
}

// Add parallax effect on mouse move
const gallerySection = document.querySelector('.gallery-showcase');
if (gallerySection) {
  gallerySection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = gallerySection.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    const image = document.querySelector('.image-frame');
    if (image) {
      image.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
    }
  });
  
  gallerySection.addEventListener('mouseleave', () => {
    const image = document.querySelector('.image-frame');
    if (image) {
      image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    }
  });
}












document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const lightbox = document.getElementById('furniture-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-description');
    const imageCards = document.querySelectorAll('.image-card');
    let currentImageIndex = 0;

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Collect all images and their details
    const galleryImages = Array.from(imageCards).map(card => ({
        src: card.querySelector('img').src,
        alt: card.querySelector('img').alt,
        title: card.querySelector('.overlay-content h3').textContent,
        description: card.querySelector('.overlay-content p').textContent
    }));

    // Open Lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Animation
        gsap.fromTo(lightbox,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );

        gsap.fromTo(lightboxImg,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, delay: 0.2, ease: "power3.out" }
        );
    }

    // Update Lightbox Content
    function updateLightboxContent() {
        const currentImage = galleryImages[currentImageIndex];
        
        gsap.to([lightboxImg, lightboxTitle, lightboxDesc], {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                lightboxImg.src = currentImage.src;
                lightboxImg.alt = currentImage.alt;
                lightboxTitle.textContent = currentImage.title;
                lightboxDesc.textContent = currentImage.description;

                gsap.to([lightboxImg, lightboxTitle, lightboxDesc], {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1
                });
            }
        });
    }

    // Close Lightbox
    function closeLightbox() {
        gsap.to(lightbox, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Navigate Images
    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        updateLightboxContent();
    }

    // Event Listeners
    imageCards.forEach((card, index) => {
        // Load images with fade-in effect
        const img = card.querySelector('img');
        img.style.opacity = '0';
        
        img.onload = () => {
            gsap.to(img, {
                opacity: 1,
                duration: 0.5,
                delay: index * 0.1
            });
        };

        // Click handler
        card.addEventListener('click', () => openLightbox(index));
    });

    // Navigation handlers
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.nav-btn.prev').addEventListener('click', () => navigateImage(-1));
    document.querySelector('.nav-btn.next').addEventListener('click', () => navigateImage(1));

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.style.display === 'flex') return;
        
        switch(e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft': navigateImage(-1); break;
            case 'ArrowRight': navigateImage(1); break;
        }
    });

    // Touch Navigation
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > 50) {
            navigateImage(swipeDistance > 0 ? -1 : 1);
        }
    });

    // Lazy loading images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    imageCards.forEach(card => imageObserver.observe(card));
});