(function () {
  const store = window.PortfolioStore;
  const data = store.getData();

  const brandName = document.getElementById("brandName");
  const heroTag = document.getElementById("heroTag");
  const heroTitle = document.getElementById("heroTitle");
  const heroDescription = document.getElementById("heroDescription");
  const aboutHeading = document.getElementById("aboutHeading");
  const aboutText = document.getElementById("aboutText");
  const quickEmail = document.getElementById("quickEmail");
  const quickLocation = document.getElementById("quickLocation");
  const heroStats = document.getElementById("heroStats");
  const projectsGrid = document.getElementById("projectsGrid");
  const skillsGrid = document.getElementById("skillsGrid");
  const contactInfo = document.getElementById("contactInfo");
  const socialLinks = document.getElementById("socialLinks");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  const skillDescriptions = {
    "HTML5": "Semantic page structure focused on accessibility and maintainability.",
    "CSS3": "Modern layouts, responsive systems, and polished visual presentation.",
    "JavaScript": "Interactive interfaces, dynamic components, and data-driven UI behavior.",
    "UI Animation": "Motion that supports hierarchy, feedback, and a more premium feel.",
    "Bootstrap": "Fast UI development with reusable layout and component patterns.",
    "Git & GitHub": "Version control workflows for safe collaboration and deployment.",
    "Node.js": "Server-side JavaScript for APIs, logic handling, and scalable architecture.",
    "Express.js": "Backend routing and middleware structure for Node.js applications.",
    "REST APIs": "Connecting frontend experiences with backend data and integrations.",
    "MongoDB": "Document-based database workflows for modern web applications.",
    "Database Design": "Organizing application data with maintainable structure and clarity."
  };
  const skillIcons = {
    "HTML5": "html",
    "CSS3": "css",
    "JavaScript": "js",
    "UI Animation": "motion",
    "Bootstrap": "bootstrap",
    "Git & GitHub": "git",
    "Node.js": "node",
    "Express.js": "express",
    "REST APIs": "api",
    "MongoDB": "mongo",
    "Database Design": "database",
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderProfile() {
    const { profile, stats, projects, skills } = data;

    brandName.textContent = profile.name;
    heroTag.textContent = profile.roleTag;
    heroTitle.textContent = profile.heroTitle;
    heroDescription.textContent = profile.heroDescription;
    aboutHeading.textContent = profile.aboutHeading;
    aboutText.textContent = profile.aboutText;
    quickEmail.textContent = profile.email;
    quickLocation.textContent = profile.location;

    heroStats.innerHTML = stats.map((item) => `
      <article class="metric-card">
        <span class="metric-value">${escapeHtml(item.value)}</span>
        <span class="metric-label">${escapeHtml(item.label)}</span>
      </article>
    `).join("");

    projectsGrid.innerHTML = projects.map((project, index) => `
      <article class="project-card reveal">
        <div class="project-top">
          <span class="project-index">0${index + 1}</span>
          <span class="contact-pill">${escapeHtml(project.tags[0] || "Featured")}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p class="project-copy">${escapeHtml(project.description)}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Open Project</a>
      </article>
    `).join("");

    skillsGrid.innerHTML = skills.map((skill) => `
      <article class="skill-card reveal">
        <span class="skill-icon">${getSkillIcon(skillIcons[skill] || "code")}</span>
        <h3>${escapeHtml(skill)}</h3>
      </article>
    `).join("");

    contactInfo.innerHTML = `
      <div class="contact-item">
        <span class="contact-label">Email</span>
        <strong>${escapeHtml(profile.email)}</strong>
      </div>
      <div class="contact-item">
        <span class="contact-label">Phone</span>
        <strong>${escapeHtml(profile.phone)}</strong>
      </div>
      <div class="contact-item">
        <span class="contact-label">Location</span>
        <strong>${escapeHtml(profile.location)}</strong>
      </div>
      <div class="contact-item">
        <span class="contact-label">Experience</span>
        <strong>${escapeHtml(profile.experience)}</strong>
      </div>
    `;

    socialLinks.innerHTML = Object.entries(profile.socials)
      .filter(([, url]) => url)
      .map(([label, url]) => `
        <a class="social-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
          <span>${escapeHtml(label)}</span>
          <span>Visit</span>
        </a>
      `)
      .join("");

    initReveal();
  }

  function validateForm(payload) {
    if (!payload.name.trim() || !payload.email.trim() || !payload.subject.trim() || !payload.message.trim()) {
      return "Please fill in all fields.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(payload.email)) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    const error = validateForm(payload);
    formStatus.className = "form-status";

    if (error) {
      formStatus.textContent = error;
      formStatus.classList.add("error");
      return;
    }

    store.addMessage(payload);
    form.reset();
    formStatus.textContent = "Message sent successfully. It is now visible in the admin page.";
    formStatus.classList.add("success");
  });

  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
    });
  });

  function initSectionPointerEffects() {
    const sections = document.querySelectorAll(".interactive-section");

    sections.forEach((section) => {
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

  function getSkillIcon(type) {
    const icons = {
      html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1.3 14.8L12 21l-5.7-3.2L5 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m9 8 .4 6 2.6.8 2.7-.9.3-3.9H9.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      css: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1.3 14.8L12 21l-5.7-3.2L5 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 8h6.5l-.4 3.2H9.7m.2 2.8h4.7l-.2 1.8-2.4.8-2.3-.8-.1-1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      js: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 9v6c0 1-.6 1.5-1.7 1.5M14.3 15.6c.4.7 1 1 1.8 1 .9 0 1.5-.4 1.5-1.1 0-.8-.5-1.1-1.7-1.6-1.2-.4-2.2-1-2.2-2.5 0-1.4 1.1-2.4 2.8-2.4 1.2 0 2 .4 2.6 1.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      responsive: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="12" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="17" y="8" width="4" height="8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 18h2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      motion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2.5-5.3 5.5-8 9-8 2.4 0 4.7 1.2 7 3.7M20 10c-2.5 5.3-5.5 8-9 8-2.4 0-4.7-1.2-7-3.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      figma: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a3 3 0 1 1 0 6H9a3 3 0 1 1 0-6h3Zm0 6a3 3 0 1 1 0 6 3 3 0 1 1 0-6Zm0 6a3 3 0 1 1 0 6 3 3 0 1 1 0-6Zm3-12a3 3 0 1 1 0 6h-3V4h3Zm0 6a3 3 0 1 1 0 6h-3v-6h3Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      bootstrap: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 8h3.3c1.7 0 2.7.8 2.7 2.1 0 .9-.4 1.6-1.3 1.9 1.2.3 1.8 1.1 1.8 2.3 0 1.7-1.2 2.7-3.3 2.7H10V8Zm2 3.6h1.1c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H12v2.2Zm0 4h1.4c1 0 1.6-.4 1.6-1.2s-.6-1.2-1.6-1.2H12v2.4Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
      git: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 8-8 8-8-8 8-8Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 10.5a1.5 1.5 0 1 0 0 .1V15a1.5 1.5 0 1 0 1.7 1.5V12a1.5 1.5 0 0 0 1.3-1.5c0-.2 0-.4-.1-.6l2.1 2.1a1.5 1.5 0 1 0 .9-.9l-2.3-2.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      node: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 9.5v5m5-5v5m-5-2.5h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      express: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 10h4M8 14h8M14 10h2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      api: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 5l-2 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      mongo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c2.8 3.2 4.2 6 4.2 8.6 0 3.5-1.8 6-4.2 7.4-2.4-1.4-4.2-3.9-4.2-7.4C7.8 10 9.2 7.2 12 4Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 6v13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      database: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
      speed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15a7 7 0 1 1 14 0" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m12 12 4-2M12 15h.01" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 5l-3 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    return icons[type] || icons.code;
  }

  function initCustomCursor() {
    if (!cursorDot || !cursorRing || window.matchMedia("(pointer: coarse)").matches) {
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
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorDot.classList.add("visible");
      cursorRing.classList.add("visible");
    });

    window.addEventListener("pointerleave", () => {
      cursorDot.classList.remove("visible");
      cursorRing.classList.remove("visible");
    });

    const interactiveItems = document.querySelectorAll("a, button, input, textarea, .skill-card, .project-card");
    interactiveItems.forEach((item) => {
      item.addEventListener("pointerenter", () => cursorRing.classList.add("active"));
      item.addEventListener("pointerleave", () => cursorRing.classList.remove("active"));
    });

    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      cursorRing.classList.add("scrolling");
      targetScaleX = scrollingDown ? 0.9 : 1.12;
      targetScaleY = scrollingDown ? 1.22 : 0.9;
      window.clearTimeout(window.__cursorScrollTimer);
      window.__cursorScrollTimer = window.setTimeout(() => {
        cursorRing.classList.remove("scrolling");
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
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(${ringScaleX}, ${ringScaleY})`;
      requestAnimationFrame(animateRing);
    }

    animateRing();
  }

  function initReveal() {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));

    revealItems.forEach((item, index) => {
      const siblings = item.parentElement ? Array.from(item.parentElement.children).filter((child) => child.classList.contains("reveal")) : [];
      const siblingIndex = Math.max(0, siblings.indexOf(item));
      const delay = Math.min(siblingIndex * 0.08, 0.4);
      item.style.setProperty("--reveal-delay", `${delay}s`);
      item.style.setProperty("--reveal-order", `${index}`);
    });

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

  renderProfile();
  initSectionPointerEffects();
  initCustomCursor();

  window.addEventListener("load", () => {
    document.body.classList.add("is-ready");
  });
})();
