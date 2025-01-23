function openVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const youtubeVideo = document.getElementById('youtubeVideo');
    youtubeVideo.src = "https://www.youtube.com/embed/MKBflHP4UXU?si=nYJq3LVy9EPc0EZl";
    videoOverlay.style.display = 'flex';
}

function closeVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const youtubeVideo = document.getElementById('youtubeVideo');
    youtubeVideo.src = "";
    videoOverlay.style.display = 'none';
}










document.addEventListener('DOMContentLoaded', function() {
const visibilityWatcher = new IntersectionObserver((sections) => {
    sections.forEach(section => {
        if (section.isIntersecting) {
            section.target.style.animation = 'fadeInUp 1s forwards';
        }
    });
}, { threshold: 0.3 });

const customerElements = document.querySelectorAll('.customer-heading, .customer-description');
customerElements.forEach(element => visibilityWatcher.observe(element));
});












