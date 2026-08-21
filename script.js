/* =========================================================
   IHSAN ARSHAD PORTFOLIO - JAVASCRIPT
   Version: 3.0 - Professional Enhanced
========================================================= */


/* =========================================================
   1. LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 700);

});


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const cursor = document.getElementById("cursor");
const revealElements = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");
const contactForm = document.getElementById("contactForm");


/* =========================================================
   3. NAVBAR SCROLL EFFECT
   ========================================================= */

function handleNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}


window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =========================================================
   4. MOBILE MENU TOGGLE
   ========================================================= */

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        if (navLinks.classList.contains("open")) {
            menuBtn.innerHTML = "✕";
        } else {
            menuBtn.innerHTML = "☰";
        }

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");
            menuBtn.innerHTML = "☰";

        });

    });

}


/* =========================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: .12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   6. SKILL BARS ANIMATION
   ========================================================= */

const skillObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;
                const width = bar.getAttribute("data-width");

                if (width) {
                    bar.style.width = width;
                }

                skillObserver.unobserve(bar);

            }

        });

    },
    {
        threshold: .4
    }
);


progressBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   7. CUSTOM CURSOR
   ========================================================= */

if (cursor && window.innerWidth > 650) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });


    function animateCursor() {

        currentX += (mouseX - currentX) * .15;
        currentY += (mouseY - currentY) * .15;

        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);

    }


    animateCursor();


    document.querySelectorAll(
        "a, button, .service, .skill, .platform, .hobby, .edu-card, .about-card"
    ).forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
        });

    });

}


/* =========================================================
   8. SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const offset = navbar ? navbar.offsetHeight : 0;

        const position = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   9. ACTIVE NAVIGATION LINKS
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');


const activeObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute("id");

            navAnchors.forEach(link => {

                link.classList.remove("active-link");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active-link");
                }

            });

        });

    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);


sections.forEach(section => {

    activeObserver.observe(section);

});


/* =========================================================
   10. CONTACT FORM SUBMISSION
   ========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const button = contactForm.querySelector("button");

        if (!button) return;

        const original = button.innerHTML;

        button.innerHTML = "Message Sent ✓";
        button.style.pointerEvents = "none";
        button.style.opacity = ".7";

        contactForm.reset();

        setTimeout(() => {

            button.innerHTML = original;
            button.style.pointerEvents = "auto";
            button.style.opacity = "1";

        }, 2500);

    });

}


/* =========================================================
   11. 3D TILT EFFECT ON CARDS
   ========================================================= */

const tiltCards = document.querySelectorAll(
    ".service, .platform, .hobby, .edu-card"
);


if (window.innerWidth > 900) {

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `
                translateY(-8px)
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   12. HERO CONTENT PARALLAX
   ========================================================= */

const heroContent = document.querySelector(".hero-content");


if (heroContent && window.innerWidth > 900) {

    document.addEventListener("mousemove", event => {

        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;

        heroContent.style.transform = `
            translate(
                ${x * 7}px,
                ${y * 7}px
            )
        `;

    });

}


/* =========================================================
   13. ORB PARALLAX EFFECT
   ========================================================= */

const orbs = document.querySelectorAll(".orb");


if (window.innerWidth > 800) {

    document.addEventListener("mousemove", event => {

        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;

        orbs.forEach((orb, index) => {

            const strength = (index + 1) * 12;

            orb.style.transform = `
                translate(
                    ${x * strength}px,
                    ${y * strength}px
                )
            `;

        });

    });

}


/* =========================================================
   14. ESCAPE KEY TO CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (navLinks && navLinks.classList.contains("open")) {

            navLinks.classList.remove("open");

            if (menuBtn) {
                menuBtn.innerHTML = "☰";
            }

        }

    }

});


/* =========================================================
   15. TAB TITLE CHANGE ON VISIBILITY
   ========================================================= */

document.addEventListener("visibilitychange", () => {

    if (document.visibilityState === "visible") {

        document.title = "Ihsan Arshad — Designer & Developer";

    } else {

        document.title = "Come back — Ihsan Arshad";

    }

});


/* =========================================================
   16. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%cIHSAN ARSHAD",
    `
    color:#4B66FF;
    font-size:25px;
    font-weight:800;
    `
);

console.log(
    "%cDesigner • Developer • Freelancer",
    `
    color:#999;
    font-size:13px;
    `
);


/* =========================================================
   17. PARALLAX SCROLL EFFECT
   ========================================================= */

const parallaxElements = document.querySelectorAll(
    ".about-card, .edu-card, .service, .skill, .platform, .hobby"
);


function handleParallax() {

    parallaxElements.forEach(element => {

        const rect = element.getBoundingClientRect();
        const scrolled = window.scrollY;

        if (rect.top < window.innerHeight && rect.bottom > 0) {

            const speed = 0.02;
            const yPos = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;

            if (window.innerWidth > 900) {
                element.style.transform = `translateY(${yPos * 0.3}px)`;
            }

        }

    });

}


let parallaxTimeout;

window.addEventListener("scroll", () => {

    clearTimeout(parallaxTimeout);

    parallaxTimeout = setTimeout(() => {
        handleParallax();
    }, 10);

});


/* =========================================================
   18. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.querySelectorAll("a, button, input, textarea").forEach(element => {

    element.addEventListener("focus", () => {

        if (cursor) {
            cursor.classList.add("hover");
        }

    });

    element.addEventListener("blur", () => {

        if (cursor) {
            cursor.classList.remove("hover");
        }

    });

});


/* =========================================================
   19. PERFORMANCE OPTIMIZATION
   ========================================================= */

if ("requestIdleCallback" in window) {

    requestIdleCallback(() => {

        const images = document.querySelectorAll("img");

        images.forEach(img => {

            if (img.complete) return;

            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });

        });

    });

}


/* =========================================================
   20. RESIZE HANDLER
   ========================================================= */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        if (window.innerWidth <= 650 && cursor) {
            cursor.style.display = "none";
        } else if (cursor) {
            cursor.style.display = "block";
        }

    }, 250);

});


console.log("%c🚀 Portfolio Loaded Successfully!", "color:#42e17b; font-size:14px;");