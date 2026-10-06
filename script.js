/* =========================
   PROJECT REVEAL ANIMATION
========================= */

const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


projects.forEach((project) => {

    project.style.opacity = "0";

    project.style.transform = "translateY(35px)";

    project.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(project);

});


/* =========================
   ADD SHOW CLASS
========================= */

const style = document.createElement("style");

style.innerHTML = `

.project.show {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

`;

document.head.appendChild(style);


/* =========================
   SMOOTH ANCHOR LINKS
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});