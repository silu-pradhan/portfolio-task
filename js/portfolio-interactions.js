(function () {
  window.PortfolioModules = window.PortfolioModules || {};
  const validateForm = window.PortfolioModules.validateForm;

  function initNavigation(dom) {
    if (!dom.menuToggle || !dom.siteNav) {
      return;
    }

    dom.menuToggle.addEventListener("click", () => {
      dom.siteNav.classList.toggle("open");
    });

    dom.siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        dom.siteNav.classList.remove("open");
      });
    });
  }

  function initContactForm(dom, store) {
    if (!dom.form || !dom.formStatus) {
      return;
    }

    dom.form.addEventListener("submit", (event) => {
      event.preventDefault();

    const formData = new FormData(dom.form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    const error = validateForm(payload);
    dom.formStatus.className = "form-status";

    if (error) {
      dom.formStatus.textContent = error;
      dom.formStatus.classList.add("error");
      return;
    }

    const recipientEmail = store.getData().profile.email;
    store.addMessage(payload);

    const mailSubject = encodeURIComponent(payload.subject);
    const mailBody = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
    dom.form.reset();
    dom.formStatus.textContent = "Your email app has been opened with the message addressed to Santanu Pradhan.";
    dom.formStatus.classList.add("success");
    });
  }

  function initSectionPointerEffects() {
    document.querySelectorAll(".interactive-section").forEach((section) => {
      section.addEventListener("pointermove", (event) => {
        const rect = section.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        section.style.setProperty("--mouse-x", `${x}%`);
        section.style.setProperty("--mouse-y", `${y}%`);
        section.classList.add("is-active");
      });

      section.addEventListener("pointerenter", () => {
        section.classList.add("is-active");
      });

      section.addEventListener("pointerleave", () => {
        section.classList.remove("is-active");
        section.style.setProperty("--mouse-x", "50%");
        section.style.setProperty("--mouse-y", "50%");
      });
    });
  }

  function initCustomCursor(dom) {
    if (!dom.cursorDot || !dom.cursorRing || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let ringScaleX = 1;
  let ringScaleY = 1;
  let targetScaleX = 1;
  let targetScaleY = 1;

  document.body.classList.add("cursor-enabled");

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dom.cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    dom.cursorDot.classList.add("visible");
    dom.cursorRing.classList.add("visible");
  });

  window.addEventListener("pointerleave", () => {
    dom.cursorDot.classList.remove("visible");
    dom.cursorRing.classList.remove("visible");
  });

  document.querySelectorAll("a, button, input, textarea, .skill-card, .project-card").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      dom.cursorRing.classList.add("active");
      dom.cursorDot.classList.add("active");
    });
    item.addEventListener("pointerleave", () => {
      dom.cursorRing.classList.remove("active");
      dom.cursorDot.classList.remove("active");
    });
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    dom.cursorRing.classList.add("scrolling");
    targetScaleX = scrollingDown ? 0.9 : 1.12;
    targetScaleY = scrollingDown ? 1.22 : 0.9;

    window.clearTimeout(window.__cursorScrollTimer);
    window.__cursorScrollTimer = window.setTimeout(() => {
      dom.cursorRing.classList.remove("scrolling");
      targetScaleX = 1;
      targetScaleY = 1;
    }, 180);

    lastScrollY = currentScrollY;
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ringScaleX += (targetScaleX - ringScaleX) * 0.2;
    ringScaleY += (targetScaleY - ringScaleY) * 0.2;
    dom.cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(${ringScaleX}, ${ringScaleY})`;
    requestAnimationFrame(animateRing);
  }

    animateRing();
  }

  function initReveal() {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));

    if (!revealItems.length) {
      return;
    }

  revealItems.forEach((item, index) => {
    const siblings = item.parentElement
      ? Array.from(item.parentElement.children).filter((child) => child.classList.contains("reveal"))
      : [];
    const siblingIndex = Math.max(0, siblings.indexOf(item));
    const delay = Math.min(siblingIndex * 0.08, 0.4);
    item.style.setProperty("--reveal-delay", `${delay}s`);
    item.style.setProperty("--reveal-order", `${index}`);
  });

  if (typeof window.IntersectionObserver !== "function") {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px"
  });

    revealItems.forEach((item) => observer.observe(item));
  }

  function initLoadAnimation() {
    window.addEventListener("load", () => {
      document.body.classList.add("is-ready");
    });
  }

  window.PortfolioModules.initNavigation = initNavigation;
  window.PortfolioModules.initContactForm = initContactForm;
  window.PortfolioModules.initSectionPointerEffects = initSectionPointerEffects;
  window.PortfolioModules.initCustomCursor = initCustomCursor;
  window.PortfolioModules.initReveal = initReveal;
  window.PortfolioModules.initLoadAnimation = initLoadAnimation;
})();
