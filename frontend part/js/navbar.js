
document.addEventListener("scroll", () => {
    const contactNavbar = document.getElementById("jr-contact-navbar");
    const mainNavbar = document.getElementById("jr-main-navbar");
  
    if (window.scrollY > 50) {
        // Add scrolled class to make changes
        contactNavbar.classList.add("scrolled");
        mainNavbar.classList.add("scrolled");
    } else {
        // Remove scrolled class to revert changes
        contactNavbar.classList.remove("scrolled");
        mainNavbar.classList.remove("scrolled");
    }
  });