
/* ==========================================
   AIKEN'S WRLD — PREMIUM INTERACTIONS
   Project reveals • Smooth scrolling • Motion
========================================== */

(() => {
    "use strict";

    /* ==========================================
       SETTINGS
    ========================================== */

    const SELECTORS = {
        projects: ".project",
        anchorLinks: 'a[href^="#"]'
    };

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* ==========================================
       PROJECT REVEAL ANIMATION
    ========================================== */

    const projects = document.querySelectorAll(
        SELECTORS.projects
    );

    // Keep projects visible if animations are unsupported
    // or the visitor prefers reduced motion.

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {

        projects.forEach((project) => {
            project.classList.add("show");
        });

    } else {

        // Add the animation styles only once.

        if (!document.querySelector("#aiken-reveal-styles")) {

            const style = document.createElement("style");

            style.id = "aiken-reveal-styles";

            style.textContent = `
                .project {
                    opacity: 0;
                    transform: translate3d(0, 35px, 0);
                    transition:
                        opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: opacity, transform;
                }

                .project.show {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                    will-change: auto;
                }

                @media (prefers-reduced-motion: reduce) {
                    .project,
                    .project.show {
                        opacity: 1;
                        transform: none;
                        transition: none;
                        will-change: auto;
                    }
                }
            `;

            document.head.appendChild(style);
        }


        // Reveal projects as they enter the viewport.

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("show");

                    currentObserver.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px 35px 0px"
            }
        );


        projects.forEach((project, index) => {

            // A subtle stagger creates a more intentional reveal.

            project.style.transitionDelay =
                `${Math.min(index % 4, 3) * 90}ms`;

            observer.observe(project);

        });

    }


    /* ==========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================== */

    const anchorLinks = document.querySelectorAll(
        SELECTORS.anchorLinks
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            // Ignore empty or invalid anchor targets.

            if (!href || href === "#") return;

            let target;

            try {
                target = document.querySelector(href);
            } catch {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

            // Update the URL hash without triggering a jump.

            if (window.location.hash !== href) {
                history.pushState(null, "", href);
            }

        });

    });


    /* ==========================================
       EXTERNAL LINK SAFETY
    ========================================== */

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* ==========================================
       IMAGE LOADING OPTIMIZATION
    ========================================== */

    document.querySelectorAll("img").forEach((image) => {

        // Preserve eager loading for images explicitly
        // marked as important, such as hero images.

        if (
            !image.hasAttribute("loading") &&
            !image.closest("header")
        ) {
            image.loading = "lazy";
        }

        if (!image.hasAttribute("decoding")) {
            image.decoding = "async";
        }

    });


    /* ==========================================
       INITIALIZATION
    ========================================== */

    document.documentElement.classList.add(
        "aiken-interactions-ready"
    );

})();
