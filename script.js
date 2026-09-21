document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const typingText = document.getElementById("typing-text");
  const year = document.getElementById("year");
  const backToTop = document.getElementById("back-to-top");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const closeMenu = () => {
    nav?.classList.remove("open");
    menuToggle?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("click", event => {
    if (window.innerWidth <= 760 &&
        nav?.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  // Typing effect
  if (typingText) {
    const phrases = [
      "building_intelligence()",
      "learning_machine_learning()",
      "training_models()",
      "exploring_generative_ai()",
      "becoming_ai_engineer()"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      typingText.textContent = deleting
        ? phrase.slice(0, charIndex--)
        : phrase.slice(0, charIndex++);

      let delay = deleting ? 38 : 70;

      if (!deleting && charIndex > phrase.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex < 0) {
        deleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }

      window.setTimeout(type, delay);
    };

    type();
  }

  // Reveal on scroll
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // Navbar shadow + back-to-top
  const updateScrollUI = () => {
    const y = window.scrollY;
    navbar?.classList.toggle("scrolled", y > 20);
    backToTop?.classList.toggle("show", y > 500);
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active section
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Contact form: frontend-only feedback.
  // Replace this handler with Formspree/EmailJS/backend integration for real delivery.
  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "Message form validated. Connect this form to an email service to receive submissions.";
    contactForm.reset();
  });
});
