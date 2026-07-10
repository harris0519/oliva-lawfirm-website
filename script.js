document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var navToggle = document.querySelector(".nav-toggle");
    var navWrapper = document.querySelector(".nav-wrapper");
    var navLinks = document.querySelector(".nav-links");
    var navIndicator = document.getElementById("navIndicator");

    var mobileBreakpoint = 820;

    function isMobileView() {
        return window.innerWidth <= mobileBreakpoint;
    }

    /*
    ==================================================
    MOBILE NAVIGATION
    ==================================================
    */

    function closeAllMegaMenus(exceptItem) {
        var menuItems = document.querySelectorAll(
            ".nav-links > li.has-mega-menu"
        );

        menuItems.forEach(function (item) {
            if (item !== exceptItem) {
                item.classList.remove("is-open");

                var trigger = item.querySelector(
                    ".nav-dropdown-trigger"
                );

                if (trigger) {
                    trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        });
    }

    function openMobileNavigation() {
        if (!navToggle || !navWrapper) {
            return;
        }

        navToggle.classList.add("is-active");
        navWrapper.classList.add("is-open");

        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        body.classList.add("nav-open");
    }

    function closeMobileNavigation() {
        if (!navToggle || !navWrapper) {
            return;
        }

        navToggle.classList.remove("is-active");
        navWrapper.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        body.classList.remove("nav-open");

        closeAllMegaMenus(null);
    }

    if (navToggle) {
        navToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            var isOpen =
                navWrapper &&
                navWrapper.classList.contains("is-open");

            if (isOpen) {
                closeMobileNavigation();
            } else {
                openMobileNavigation();
            }
        });
    }

    /*
    ==================================================
    MOBILE MEGA MENUS
    ==================================================
    */

    var megaMenuItems = document.querySelectorAll(
        ".nav-links > li.has-mega-menu"
    );

    megaMenuItems.forEach(function (menuItem) {
        var trigger = menuItem.querySelector(
            ".nav-dropdown-trigger"
        );

        var megaMenu = menuItem.querySelector(".mega-menu");

        if (!trigger || !megaMenu) {
            return;
        }

        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");

        trigger.addEventListener("click", function (event) {
            if (!isMobileView()) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            var currentlyOpen =
                menuItem.classList.contains("is-open");

            closeAllMegaMenus(menuItem);

            if (currentlyOpen) {
                menuItem.classList.remove("is-open");

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            } else {
                menuItem.classList.add("is-open");

                trigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

                window.setTimeout(function () {
                    trigger.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }, 100);
            }
        });
    });

    /*
    ==================================================
    CLOSE NAVIGATION AFTER SELECTING A REAL LINK
    ==================================================
    */

    if (navLinks) {
        var destinationLinks = navLinks.querySelectorAll(
            "a:not(.nav-dropdown-trigger)"
        );

        destinationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (isMobileView()) {
                    closeMobileNavigation();
                }
            });
        });
    }

    /*
    ==================================================
    CLOSE NAVIGATION WHEN TAPPING OUTSIDE
    ==================================================
    */

    document.addEventListener("click", function (event) {
        if (!isMobileView()) {
            return;
        }

        var header = document.querySelector("header");

        if (
            header &&
            !header.contains(event.target) &&
            navWrapper &&
            navWrapper.classList.contains("is-open")
        ) {
            closeMobileNavigation();
        }
    });

    /*
    ==================================================
    RESET NAVIGATION AFTER RESIZE
    ==================================================
    */

    window.addEventListener("resize", function () {
        if (!isMobileView()) {
            closeMobileNavigation();
        }

        resetNavigationIndicator();
    });

    /*
    ==================================================
    ESCAPE KEY
    ==================================================
    */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileNavigation();
            closeContactModal();
        }
    });

    /*
    ==================================================
    DESKTOP NAVIGATION INDICATOR
    ==================================================
    */

    var topLevelLinks = document.querySelectorAll(
        ".nav-links > li > a:not(.contact-btn)"
    );

    function moveNavigationIndicator(link) {
        if (
            !navIndicator ||
            !navWrapper ||
            !link ||
            isMobileView()
        ) {
            return;
        }

        var wrapperRect =
            navWrapper.getBoundingClientRect();

        var linkRect = link.getBoundingClientRect();

        navIndicator.style.left =
            linkRect.left - wrapperRect.left + "px";

        navIndicator.style.width =
            linkRect.width + "px";

        navIndicator.style.opacity = "1";
    }

    function resetNavigationIndicator() {
        if (!navIndicator) {
            return;
        }

        navIndicator.style.width = "0";
        navIndicator.style.opacity = "0";
    }

    topLevelLinks.forEach(function (link) {
        link.addEventListener("mouseenter", function () {
            moveNavigationIndicator(link);
        });

        link.addEventListener("focus", function () {
            moveNavigationIndicator(link);
        });
    });

    if (navWrapper) {
        navWrapper.addEventListener(
            "mouseleave",
            resetNavigationIndicator
        );
    }

    /*
    ==================================================
    CONTACT MODAL
    ==================================================
    */

    var modalContainer = document.getElementById(
        "contactModalContainer"
    );

    if (modalContainer) {
        modalContainer.innerHTML = `
            <div
                class="contact-modal"
                id="contactModal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contactModalTitle"
            >
                <div class="contact-modal-box">
                    <button
                        type="button"
                        class="contact-close"
                        aria-label="Close contact information"
                    >
                        &times;
                    </button>

                    <span class="contact-label">
                        Get in Touch
                    </span>

                    <h2 id="contactModalTitle">
                        CONTACT OUR FIRM
                    </h2>

                    <div class="contact-info">
                        <p>
                            <strong>Office:</strong><br>
                            Mandaluyong City, Metro Manila,
                            Philippines
                        </p>

                        <p>
                            <strong>Telephone:</strong><br>
                            (+632) 8535-9320<br>
                            (+632) 8535-9231
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            <a href="mailto:olivaandpartners@dof.law">
                                olivaandpartners@dof.law
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    var contactModal =
        document.getElementById("contactModal");

    var openContactButton =
        document.getElementById("openContactModal");

    var closeContactButton = contactModal
        ? contactModal.querySelector(".contact-close")
        : null;

    function openContactModal(event) {
        if (event) {
            event.preventDefault();
        }

        closeMobileNavigation();

        if (!contactModal) {
            return;
        }

        contactModal.classList.add("active");
        body.classList.add("modal-open");

        if (closeContactButton) {
            closeContactButton.focus();
        }
    }

    function closeContactModal() {
        if (!contactModal) {
            return;
        }

        contactModal.classList.remove("active");
        body.classList.remove("modal-open");
    }

    if (openContactButton) {
        openContactButton.addEventListener(
            "click",
            openContactModal
        );
    }

    if (closeContactButton) {
        closeContactButton.addEventListener(
            "click",
            closeContactModal
        );
    }

    if (contactModal) {
        contactModal.addEventListener(
            "click",
            function (event) {
                if (event.target === contactModal) {
                    closeContactModal();
                }
            }
        );
    }

    /*
    ==================================================
    LAWYER REVEAL ANIMATION
    ==================================================
    */

    var lawyerCards = document.querySelectorAll(
        ".lawyer-card.reveal"
    );

    if (
        lawyerCards.length > 0 &&
        "IntersectionObserver" in window
    ) {
        body.classList.add("animate-lawyers");

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        lawyerCards.forEach(function (card) {
            observer.observe(card);
        });
    } else {
        lawyerCards.forEach(function (card) {
            card.classList.add("active");
        });
    }
});
