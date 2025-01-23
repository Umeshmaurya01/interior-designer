document.addEventListener('DOMContentLoaded', function() {
    const whatsappContainer = document.getElementById('whatsappContainer');
    const whatsappClose = document.getElementById('whatsappClose');

    // Check if user previously closed the WhatsApp button in this session
    if (sessionStorage.getItem('whatsappHidden') === 'true') {
        whatsappContainer.classList.add('hidden');
    }

    // Handle close button click
    whatsappClose.addEventListener('click', function(e) {
        e.preventDefault();
        whatsappContainer.classList.add('hidden');
        // Save user preference for this session only
        sessionStorage.setItem('whatsappHidden', 'true');
    });
});