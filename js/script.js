/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const preloader = document.querySelector(".preloader");

        if (preloader) {
            preloader.classList.add("hide");
        }

    }, 1500);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   THEME
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText = document.getElementById("typingText");

const words = [
    "digital experiences.",
    "modern interfaces.",
    "interactive websites.",
    "creative solutions.",
    "AI-powered ideas."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1700);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 40 : 75
    );

}

typeEffect();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.25
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");


let countersStarted = false;


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(counter => {

                        const target =
                            Number(
                                counter.dataset.target
                            );

                        let current = 0;

                        const duration = 1200;

                        const startTime =
                            performance.now();


                        function updateCounter(time) {

                            const progress =
                                Math.min(
                                    (time - startTime) /
                                    duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            current =
                                Math.floor(
                                    eased * target
                                );

                            counter.textContent =
                                current;

                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );

                    });

                }

            });

        },
        {
            threshold: 0.5
        }
    );


if (counters.length) {
    counterObserver.observe(counters[0]);
}


/* =========================================================
   SKILL BARS
========================================================= */

const skillBars =
    document.querySelectorAll(".skill-bar span");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.dataset.width;

                    entry.target.style.width =
                        width;

                    skillObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.4
        }
    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   3D CARD TILT
========================================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 850) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        }
    );

});


/* =========================================================
   HERO CUBE MOUSE INTERACTION
========================================================= */

const scene =
    document.querySelector(".scene");

const cube =
    document.querySelector(".cube");


if (scene && cube) {

    scene.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 850) {
                return;
            }

            const rect =
                scene.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 25;

            const rotateX =
                ((y / rect.height) - 0.5) * -25;

            cube.style.animation = "none";

            cube.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY + 35}deg)
                 rotateZ(5deg)`;

        }
    );


    scene.addEventListener(
        "mouseleave",
        () => {

            cube.style.animation =
                "cubeFloat 7s ease-in-out infinite";

        }
    );

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorOutline =
    document.querySelector(".cursor-outline");


let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    }
);


function animateCursor() {

    outlineX +=
        (mouseX - outlineX) * 0.15;

    outlineY +=
        (mouseY - outlineY) * 0.15;

    cursorOutline.style.left =
        `${outlineX}px`;

    cursorOutline.style.top =
        `${outlineY}px`;

    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


const interactiveElements =
    document.querySelectorAll(
        "a, button, input, textarea, .tilt-card"
    );


interactiveElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {
            cursorOutline.classList.add("hover");
        }
    );

    element.addEventListener(
        "mouseleave",
        () => {
            cursorOutline.classList.remove("hover");
        }
    );

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 850) {
                return;
            }

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px,
                           ${y * 0.15}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0,0)";

        }
    );

});


/* =========================================================
   PARTICLES
========================================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let particleCount =
    window.innerWidth < 700 ? 30 : 70;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();

window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        particleCount =
            window.innerWidth < 700
                ? 30
                : 70;

        createParticles();

    }
);


function createParticles() {

    particles = [];

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 1.5 + 0.3,

            speedX:
                (Math.random() - 0.5) * 0.25,

            speedY:
                (Math.random() - 0.5) * 0.25,

            opacity:
                Math.random() * 0.4 + 0.1

        });

    }

}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.x +=
            particle.speedX;

        particle.y +=
            particle.speedY;


        if (particle.x < 0)
            particle.x = canvas.width;

        if (particle.x > canvas.width)
            particle.x = 0;

        if (particle.y < 0)
            particle.y = canvas.height;

        if (particle.y > canvas.height)
            particle.y = 0;


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(139,92,246,${particle.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(
        drawParticles
    );

}


createParticles();
drawParticles();


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   CONTACT FORM (EmailJS)
========================================================= */

/*
    SETUP STEPS (one-time):

    1. Go to https://www.emailjs.com and sign up (free tier: 200 emails/month).
    2. Add an Email Service (connect your Gmail) -> copy the "Service ID".
    3. Create an Email Template with variables matching the form fields
       below: {{name}}, {{email}}, {{message}} -> copy the "Template ID".
    4. Go to Account > General -> copy your "Public Key".
    5. Replace the three placeholder strings below with your real values.
*/

const EMAILJS_PUBLIC_KEY = "YWQ5_by06A8UOYR4I";
const EMAILJS_SERVICE_ID = "service_blg5h1e";
const EMAILJS_TEMPLATE_ID = "template_g4c22f7";

if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const submitBtn =
            contactForm.querySelector(".submit-btn");

        submitBtn.disabled = true;

        formStatus.style.color = "#4ade80";
        formStatus.textContent = "Sending your message...";

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
        ).then(() => {

            formStatus.style.color = "#4ade80";

            formStatus.textContent =
                `Thanks ${name}! Your message has been sent.`;

            contactForm.reset();

        }).catch(error => {

            formStatus.style.color = "#f87171";

            formStatus.textContent =
                "Something went wrong. Please try again or email me directly.";

            console.error("EmailJS error:", error);

        }).finally(() => {

            submitBtn.disabled = false;

            setTimeout(() => {

                formStatus.textContent = "";

            }, 6000);

        });

    }
);


/* =========================================================
   SMOOTH ANCHOR HANDLING
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const offset =
                navbar.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   PROJECT HOVER SOUND-LIKE MICRO INTERACTION
========================================================= */

document.querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.setProperty(
                    "--project-scale",
                    "1.01"
                );

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--project-scale",
                    "1"
                );

            }
        );

    });