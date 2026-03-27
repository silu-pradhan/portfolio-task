(function () {
  const auth = window.AdminAuth;
  auth.requireAuth();

  const store = window.PortfolioStore;
  let data = store.getData();

  const profileFields = {
    name: document.getElementById("adminName"),
    roleTag: document.getElementById("adminRole"),
    email: document.getElementById("adminEmail"),
    phone: document.getElementById("adminPhone"),
    location: document.getElementById("adminLocation"),
    experience: document.getElementById("adminExperience"),
    heroTitle: document.getElementById("adminHeroTitle"),
    heroDescription: document.getElementById("adminHeroDescription"),
    aboutHeading: document.getElementById("adminAboutHeading"),
    aboutText: document.getElementById("adminAboutText"),
    linkedIn: document.getElementById("adminLinkedIn"),
    gitHub: document.getElementById("adminGitHub")
  };

  const projectEditor = document.getElementById("projectEditor");
  const skillEditor = document.getElementById("skillEditor");
  const messageList = document.getElementById("messageList");

  const profileStatus = document.getElementById("profileStatus");
  const projectsStatus = document.getElementById("projectsStatus");
  const skillsStatus = document.getElementById("skillsStatus");

  function setStatus(node, text) {
    node.textContent = text;
    window.setTimeout(() => {
      node.textContent = "";
    }, 2500);
  }

  function fillProfileFields() {
    profileFields.name.value = data.profile.name;
    profileFields.roleTag.value = data.profile.roleTag;
    profileFields.email.value = data.profile.email;
    profileFields.phone.value = data.profile.phone;
    profileFields.location.value = data.profile.location;
    profileFields.experience.value = data.profile.experience;
    profileFields.heroTitle.value = data.profile.heroTitle;
    profileFields.heroDescription.value = data.profile.heroDescription;
    profileFields.aboutHeading.value = data.profile.aboutHeading;
    profileFields.aboutText.value = data.profile.aboutText;
    profileFields.linkedIn.value = data.profile.socials.LinkedIn || "";
    profileFields.gitHub.value = data.profile.socials.GitHub || "";
  }

  function renderProjects() {
    projectEditor.innerHTML = data.projects.map((project, index) => `
      <div class="editable-card" data-project-index="${index}">
        <div class="item-head">
          <strong>Project ${index + 1}</strong>
          <button class="remove-btn" type="button" data-remove-project="${index}">Remove</button>
        </div>
        <div class="editable-grid">
          <label class="full"><span>Title</span><input data-project-field="title" value="${escapeHtml(project.title)}"></label>
          <label class="full"><span>Description</span><textarea rows="3" data-project-field="description">${escapeHtml(project.description)}</textarea></label>
          <label class="full"><span>Tags (comma separated)</span><input data-project-field="tags" value="${escapeHtml(project.tags.join(", "))}"></label>
          <label class="full"><span>Project Link</span><input data-project-field="link" value="${escapeHtml(project.link)}"></label>
        </div>
      </div>
    `).join("");
  }

  function renderSkills() {
    skillEditor.innerHTML = data.skills.map((skill, index) => `
      <div class="editable-card" data-skill-index="${index}">
        <div class="item-head">
          <strong>Skill ${index + 1}</strong>
          <button class="remove-btn" type="button" data-remove-skill="${index}">Remove</button>
        </div>
        <label><span>Skill Name</span><input data-skill-field="name" value="${escapeHtml(skill)}"></label>
      </div>
    `).join("");
  }

  function renderMessages() {
    if (!data.messages.length) {
      messageList.innerHTML = `<p class="empty-state">No contact messages yet. Messages submitted from the portfolio will appear here.</p>`;
      return;
    }

    messageList.innerHTML = data.messages.map((message) => `
      <article class="message-card">
        <div class="message-head">
          <strong>${escapeHtml(message.subject)}</strong>
          <span class="message-meta">${escapeHtml(message.submittedAt)}</span>
        </div>
        <p class="message-meta">${escapeHtml(message.name)} • ${escapeHtml(message.email)}</p>
        <p class="message-body">${escapeHtml(message.message)}</p>
      </article>
    `).join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function saveProfile() {
    data.profile = {
      ...data.profile,
      name: profileFields.name.value.trim(),
      roleTag: profileFields.roleTag.value.trim(),
      email: profileFields.email.value.trim(),
      phone: profileFields.phone.value.trim(),
      location: profileFields.location.value.trim(),
      experience: profileFields.experience.value.trim(),
      heroTitle: profileFields.heroTitle.value.trim(),
      heroDescription: profileFields.heroDescription.value.trim(),
      aboutHeading: profileFields.aboutHeading.value.trim(),
      aboutText: profileFields.aboutText.value.trim(),
      socials: {
        LinkedIn: profileFields.linkedIn.value.trim(),
        GitHub: profileFields.gitHub.value.trim()
      }
    };

    store.saveData(data);
    setStatus(profileStatus, "Profile updated.");
  }

  function saveProjects() {
    const cards = projectEditor.querySelectorAll("[data-project-index]");

    data.projects = Array.from(cards).map((card) => ({
      title: card.querySelector('[data-project-field="title"]').value.trim(),
      description: card.querySelector('[data-project-field="description"]').value.trim(),
      tags: card.querySelector('[data-project-field="tags"]').value.split(",").map((tag) => tag.trim()).filter(Boolean),
      link: card.querySelector('[data-project-field="link"]').value.trim()
    })).filter((project) => project.title && project.description);

    store.saveData(data);
    renderProjects();
    setStatus(projectsStatus, "Projects saved.");
  }

  function saveSkills() {
    const cards = skillEditor.querySelectorAll("[data-skill-index]");
    data.skills = Array.from(cards)
      .map((card) => card.querySelector('[data-skill-field="name"]').value.trim())
      .filter(Boolean);

    store.saveData(data);
    renderSkills();
    setStatus(skillsStatus, "Skills saved.");
  }

  document.getElementById("saveProfile").addEventListener("click", saveProfile);
  document.getElementById("saveProjects").addEventListener("click", saveProjects);
  document.getElementById("saveSkills").addEventListener("click", saveSkills);

  document.getElementById("addProject").addEventListener("click", () => {
    data.projects.push({
      title: "New Project",
      description: "Add a short project summary here.",
      tags: ["HTML", "CSS"],
      link: "https://example.com"
    });
    renderProjects();
  });

  document.getElementById("addSkill").addEventListener("click", () => {
    data.skills.push("New Skill");
    renderSkills();
  });

  document.getElementById("clearMessages").addEventListener("click", () => {
    data.messages = [];
    store.saveData(data);
    renderMessages();
  });

  document.getElementById("resetData").addEventListener("click", () => {
    data = store.resetData();
    fillProfileFields();
    renderProjects();
    renderSkills();
    renderMessages();
    setStatus(profileStatus, "Demo data restored.");
  });

  document.getElementById("logoutAdmin").addEventListener("click", () => {
    auth.logout();
    window.location.replace("login.html");
  });

  projectEditor.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-project]");
    if (!button) {
      return;
    }

    const index = Number(button.dataset.removeProject);
    data.projects.splice(index, 1);
    renderProjects();
  });

  skillEditor.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-skill]");
    if (!button) {
      return;
    }

    const index = Number(button.dataset.removeSkill);
    data.skills.splice(index, 1);
    renderSkills();
  });

  fillProfileFields();
  renderProjects();
  renderSkills();
  renderMessages();
})();
