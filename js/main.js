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
  const strengthList = document.getElementById("strengthList");
  const contactInfo = document.getElementById("contactInfo");
  const socialLinks = document.getElementById("socialLinks");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderProfile() {
    const { profile, stats, projects, skills, strengths } = data;

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
          ${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Open Project</a>
      </article>
    `).join("");

    skillsGrid.innerHTML = skills.map((skill) => `<span class="tag reveal">${escapeHtml(skill)}</span>`).join("");
    strengthList.innerHTML = strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

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

  function initReveal() {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  renderProfile();
  initSectionPointerEffects();
})();
