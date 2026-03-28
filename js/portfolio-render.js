(function () {
  window.PortfolioModules = window.PortfolioModules || {};

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  function renderPortfolio(dom, data, onRendered) {
    const profile = data && data.profile ? data.profile : {};
    const strengths = Array.isArray(data && data.strengths) ? data.strengths : [];
    const projects = Array.isArray(data && data.projects) ? data.projects : [];
    const skills = Array.isArray(data && data.skills) ? data.skills : [];
    const socials = profile.socials && typeof profile.socials === "object" ? profile.socials : {};
    const getSkillIcon = window.PortfolioModules.getSkillIcon || function () { return ""; };
    const skillIcons = window.PortfolioModules.skillIcons || {};
    const heroHighlights = strengths.slice(0, 3).map((item, index) => ({
      value: `0${index + 1}`,
      label: item
    }));

    if (dom.brandName) {
      dom.brandName.textContent = profile.name || "Santanu Pradhan";
    }

    if (dom.heroTag) {
      dom.heroTag.textContent = profile.roleTag || "Full Stack Developer";
    }

    if (dom.heroTitle) {
      dom.heroTitle.textContent = profile.heroTitle || "Santanu Pradhan";
    }

    if (dom.heroDescription) {
      dom.heroDescription.textContent = profile.heroDescription || "";
    }

    if (dom.heroStats) {
      dom.heroStats.innerHTML = heroHighlights.map((item) => `
        <article class="metric-card">
          <span class="metric-value">${escapeHtml(item.value)}</span>
          <span class="metric-label">${escapeHtml(item.label)}</span>
        </article>
      `).join("");
    }

    if (dom.projectsGrid) {
      dom.projectsGrid.innerHTML = projects.map((project, index) => `
        <article class="project-card reveal">
          <div class="project-top">
            <span class="project-index">0${index + 1}</span>
            <span class="contact-pill">${escapeHtml((project.tags || [])[0] || "Featured")}</span>
          </div>
          <h3>${escapeHtml(project.title || "")}</h3>
          <p class="project-copy">${escapeHtml(project.description || "")}</p>
          <div class="project-tags">
            ${(project.tags || []).map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <a class="project-link" href="${escapeHtml(project.link || "#")}" target="_blank" rel="noreferrer">Open Project</a>
        </article>
      `).join("");
    }

    if (dom.skillsGrid) {
      dom.skillsGrid.innerHTML = skills.map((skill) => `
        <article class="skill-card reveal">
          <span class="skill-icon">${getSkillIcon(skillIcons[skill] || "code")}</span>
          <h3>${escapeHtml(skill)}</h3>
        </article>
      `).join("");
    }

    if (dom.contactInfo) {
      dom.contactInfo.innerHTML = `
        <div class="contact-item">
          <span class="contact-label">Email</span>
          <strong>${escapeHtml(profile.email || "")}</strong>
        </div>
        <div class="contact-item">
          <span class="contact-label">Phone</span>
          <strong>${escapeHtml(profile.phone || "")}</strong>
        </div>
        <div class="contact-item">
          <span class="contact-label">Location</span>
          <strong>${escapeHtml(profile.location || "")}</strong>
        </div>
        <div class="contact-item">
          <span class="contact-label">Experience</span>
          <strong>${escapeHtml(profile.experience || "")}</strong>
        </div>
      `;
    }

    if (dom.socialLinks) {
      dom.socialLinks.innerHTML = Object.entries(socials)
        .filter(([, url]) => url)
        .map(([label, url]) => `
          <a class="social-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
            <span>${escapeHtml(label)}</span>
            <span>Visit</span>
          </a>
        `)
        .join("");
    }

    if (typeof onRendered === "function") {
      onRendered();
    }
  }

  window.PortfolioModules.escapeHtml = escapeHtml;
  window.PortfolioModules.validateForm = validateForm;
  window.PortfolioModules.renderPortfolio = renderPortfolio;
})();
