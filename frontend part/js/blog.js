$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 2,                     // Show two items per slide
        loop: true,                   // Enable looping
        margin: 30,                   // Margin between items
        nav: true,                    // Enable navigation arrows
        dots: true,                   // Show dots for pagination
        autoplay: true,               // Enable autoplay
        autoplayTimeout: 5000,        // Autoplay interval (3 seconds)
        autoplayHoverPause: true,     // Pause autoplay on hover
        responsive: {
            0: {
                items: 1              // Show 1 item on smaller screens
            },
            768: {
                items: 2              // Show 2 items on larger screens
            }
        }
    });
});