  // Show button when scrolling down
  window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  };

  // Scroll to top on button click
  document.getElementById("backToTop").onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };