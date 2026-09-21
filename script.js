// ==========================================
// AIJOURNEY PORTFOLIO JAVASCRIPT
// ==========================================


// ===============================
// 1. TYPING EFFECT
// ===============================

const typingElement = document.querySelector(".typing");

const messages = [
    "building_intelligence()",
    "learning_machine_learning()",
    "exploring_ai()",
    "training_models()",
    "becoming_ai_engineer()"
];

let messageIndex = 0;
let characterIndex = 0;
let deleting = false;


function typingEffect() {

    if (!typingElement) return;

    const currentMessage = messages[messageIndex];

    if (!deleting) {

        typingElement.textContent =
            currentMessage.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentMessage.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentMessage.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            messageIndex =
                (messageIndex + 1) % messages.length;

        }

    }

    const speed = deleting ? 50 : 90;

    setTimeout(typingEffect, speed);
}


typingEffect();


// ===============================
// 2. SCROLL REVEAL
// ===============================

const revealElements =
    document.querySelectorAll(
        ".section, .stack-card, .project-card, .experience-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

});


// ===============================
// 3. DYNAMIC YEAR
// ===============================

const year =
    new Date().getFullYear();

const copyright =
    document.querySelector(".copyright");

if (copyright) {

    copyright.textContent =
        `© ${year} Abhijith A | AI / ML Journey`;

}


// ===============================
// 4. ACTIVE NAVIGATION
// ===============================

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".navbar nav a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ===============================
// 5. RESUME DOWNLOAD MESSAGE
// ===============================

const resumeLinks =
    document.querySelectorAll(
        'a[href="ABHI RESUME UPDATED.pdf"]'
    );


resumeLinks.forEach((link) => {

    link.addEventListener("click", () => {

        console.log(
            "Resume opened by visitor."
        );

    });

});


// ===============================
// 6. CONTACT FORM
// ===============================

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.querySelector("#name");

            const email =
                document.querySelector("#email");

            const message =
                document.querySelector("#message");


            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                alert(
                    "Please complete all fields."
                );

                return;

            }


            alert(
                `Thank you, ${name.value}! Your message has been submitted.`
            );


            contactForm.reset();

        }
    );

}