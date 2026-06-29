const navWrapper = document.querySelector(".nav-wrapper");
const navLinks = document.querySelectorAll(".nav-links > li > a:not(.contact-btn)");
const indicator = document.querySelector(".nav-indicator");

function moveIndicator(link) {
    const wrapperRect = navWrapper.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.left = `${linkRect.left - wrapperRect.left}px`;
    indicator.style.opacity = "1";
}

navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        moveIndicator(link);
    });
});

navWrapper.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
});
document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("animate-lawyers");

    const cards = document.querySelectorAll(".lawyer-card.reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 120);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card)); 
});
document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("contactModalContainer");

    if (!container) return;

    fetch("contact-us.html")
        .then(response => response.text())
        .then(html => {

            container.innerHTML = html;

            initializeContactModal();

        })
        .catch(error => {
            console.error("Failed to load contact modal:", error);
        });

});

function initializeContactModal() {

    const openBtn = document.getElementById("openContactModal");
    const closeBtn = document.getElementById("closeContactModal");
    const modal = document.getElementById("contactModal");

    if (!openBtn || !closeBtn || !modal)
        return;

    openBtn.addEventListener("click", function (e) {

        e.preventDefault();

        modal.classList.add("active");

    });

    closeBtn.addEventListener("click", function () {

        modal.classList.remove("active");

    });

    modal.addEventListener("click", function (e) {

        if (e.target === modal) {

            modal.classList.remove("active");

        }

    });

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            modal.classList.remove("active");

        }

    });

}