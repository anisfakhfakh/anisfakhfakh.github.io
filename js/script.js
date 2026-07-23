/*
  All site behavior lives here, one function per feature. The initial
  dark/light theme AND initial language are set earlier by a small inline
  script in <head> (to avoid a flash of the wrong theme/language) — this
  file only wires up the toggle BUTTONS and everything else.
*/
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initLangToggle();
  initMobileNav();
  initScrollspy();
  initScrollReveal();
  initTypingEffect();
  initProjectLinkVisibility();
  initProjectCardTilt();
  initContactForm();
  initHeaderScrollState();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------------------
   1. THEME TOGGLE + PERSISTENCE
   Clicking the button flips data-theme on <html> and remembers the
   choice in localStorage under the SAME key ("theme") the inline
   <head> script reads on next page load.
--------------------------------------------------------------------- */
function initThemeToggle() {
  var btn = document.getElementById("theme-toggle");
  var root = document.documentElement;

  btn.addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ---------------------------------------------------------------------
   2. LANGUAGE TOGGLE (EN / FR) + PERSISTENCE
   All the actual translated text already exists in the HTML (in
   class="lang-en" / class="lang-fr" pairs) — clicking this button just
   flips data-lang on <html>, which is what the CSS rules in style.css
   use to show/hide the right one. Also updates the two or three bits of
   text that JavaScript itself generates (page title, role rotator,
   contact form messages) so they match.
--------------------------------------------------------------------- */
var PAGE_TITLES = {
  en: "Anis Fakhfakh | Data Scientist",
  fr: "Anis Fakhfakh | Scientifique de données"
};

function initLangToggle() {
  var btn = document.getElementById("lang-toggle");
  var root = document.documentElement;

  document.title = PAGE_TITLES[root.getAttribute("data-lang")] || PAGE_TITLES.en;

  btn.addEventListener("click", function () {
    var current = root.getAttribute("data-lang");
    var next = current === "fr" ? "en" : "fr";
    root.setAttribute("data-lang", next);
    localStorage.setItem("lang", next);
    document.title = PAGE_TITLES[next];
    restartTypingEffect();
  });
}

/* ---------------------------------------------------------------------
   3. MOBILE NAV TOGGLE
--------------------------------------------------------------------- */
function initMobileNav() {
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });

  // Close the mobile menu after tapping any link, so it doesn't stay open
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
    });
  });
}

/* ---------------------------------------------------------------------
   4. SCROLLSPY — highlight the nav link for whichever section is
   currently in view as the user scrolls.
--------------------------------------------------------------------- */
function initScrollspy() {
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll("#main-nav a");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
}

/* ---------------------------------------------------------------------
   5. SCROLL-TRIGGERED REVEAL ANIMATIONS
   Any element with class="reveal" fades/slides in once when it first
   scrolls into view. data-animation="slideInFromLeft|slideInFromRight"
   picks which CSS animation plays (see .reveal rules in style.css);
   without it, elements just fade up.
--------------------------------------------------------------------- */
function initScrollReveal() {
  var items = document.querySelectorAll(".reveal");

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // animate in once, not every scroll
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(function (item) { observer.observe(item); });
}

/* ---------------------------------------------------------------------
   6. ROTATING ROLE / TYPING EFFECT
   EDIT ME: add or remove roles in either array below (roleLists.en /
   roleLists.fr). Switches automatically when the language is toggled.
--------------------------------------------------------------------- */
var roleLists = {
  en: ["Data Scientist", "ML Engineer", "Researcher"], // EDIT ME
  fr: ["Scientifique de données", "Ingénieur ML", "Chercheur"] // EDIT ME
};
var typingState = { roleIndex: 0, charIndex: 0, deleting: false, timer: null };

function initTypingEffect() {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return; // leave the static text as-is

  var roles = roleLists[document.documentElement.getAttribute("data-lang")] || roleLists.en;
  typingState.charIndex = roles[0].length;
  typingState.timer = setTimeout(typingTick, 1400);
}

function restartTypingEffect() {
  if (typingState.timer) clearTimeout(typingState.timer);
  typingState.roleIndex = 0;
  typingState.deleting = false;
  var roles = roleLists[document.documentElement.getAttribute("data-lang")] || roleLists.en;
  typingState.charIndex = roles[0].length;
  document.getElementById("typing-role").textContent = roles[0];
  typingState.timer = setTimeout(typingTick, 1400);
}

function typingTick() {
  var el = document.getElementById("typing-role");
  var roles = roleLists[document.documentElement.getAttribute("data-lang")] || roleLists.en;
  var current = roles[typingState.roleIndex];

  if (!typingState.deleting) {
    typingState.charIndex++;
    if (typingState.charIndex > current.length) {
      typingState.deleting = true;
      typingState.timer = setTimeout(typingTick, 1400); // pause before deleting
      return;
    }
  } else {
    typingState.charIndex--;
    if (typingState.charIndex < 0) {
      typingState.deleting = false;
      typingState.roleIndex = (typingState.roleIndex + 1) % roles.length;
      typingState.charIndex = 0;
    }
  }

  el.textContent = current.substring(0, typingState.charIndex);
  typingState.timer = setTimeout(typingTick, typingState.deleting ? 45 : 90);
}

/* ---------------------------------------------------------------------
   7. PROJECT "VIEW ON GITHUB" BUTTON AUTO-VISIBILITY
   Project links start with a placeholder href (ADD_GITHUB_LINK_HERE) in
   index.html. As soon as you replace that placeholder with a real URL,
   the button appears automatically on the next page load — no need to
   comment/uncomment anything.
--------------------------------------------------------------------- */
function initProjectLinkVisibility() {
  var PLACEHOLDER = "ADD_GITHUB_LINK_HERE";

  document.querySelectorAll(".project-link").forEach(function (link) {
    var href = link.getAttribute("href") || "";
    if (href.trim() === "" || href.indexOf(PLACEHOLDER) !== -1) {
      link.style.display = "none";
    }
  });
}

/* ---------------------------------------------------------------------
   8. PROJECT CARD HOVER TILT (optional, purely cosmetic)
   OPTIONAL: delete this whole function (and its call above) if you'd
   rather keep only the simpler CSS-only hover lift — nothing else
   depends on it.
--------------------------------------------------------------------- */
function initProjectCardTilt() {
  var cards = document.querySelectorAll(".project-card");

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", (x * 8).toFixed(2) + "deg");
      card.style.setProperty("--ry", (y * -8).toFixed(2) + "deg");
    });
    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* ---------------------------------------------------------------------
   9. CONTACT FORM SUBMISSION (Formspree)
   Sends the form via fetch so we can show inline success/error text
   instead of leaving the page. The Accept: application/json header
   is what makes Formspree respond with JSON instead of a redirect.
--------------------------------------------------------------------- */
var FORM_MESSAGES = {
  en: {
    sending: "Sending...",
    send: "Send Message",
    success: "Thanks! Your message has been sent.",
    error: "Couldn't send right now — please email anis.fakhfakh@outlook.com directly, or set up your Formspree endpoint (see the comment above this form in index.html)."
  },
  fr: {
    sending: "Envoi en cours...",
    send: "Envoyer",
    success: "Merci ! Votre message a été envoyé.",
    error: "Envoi impossible pour le moment — écrivez directement à anis.fakhfakh@outlook.com, ou configurez votre point de terminaison Formspree (voir le commentaire au-dessus de ce formulaire dans index.html)."
  }
};

function initContactForm() {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var submitBtn = document.getElementById("form-submit-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var lang = document.documentElement.getAttribute("data-lang") === "fr" ? "fr" : "en";
    var messages = FORM_MESSAGES[lang];

    submitBtn.disabled = true;
    submitBtn.textContent = messages.sending;
    status.textContent = "";
    status.className = "";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = messages.success;
          status.className = "success";
          form.reset();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch(function () {
        status.textContent = messages.error;
        status.className = "error";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = messages.send;
      });
  });
}

/* ---------------------------------------------------------------------
   10. HEADER SCROLLED STATE (adds a background + shadow once you scroll
   past the transparent hero area)
--------------------------------------------------------------------- */
function initHeaderScrollState() {
  var header = document.getElementById("site-header");
  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        header.classList.toggle("scrolled", window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}
