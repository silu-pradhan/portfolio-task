(function () {
  const STORAGE_KEY = "portfolio-pro-data";

  const defaultData = {
    profile: {
      name: "Santanu Pradhan",
      roleTag: "Full Stack Developer",
      heroTitle: "Santanu Pradhan builds modern full stack products with clean design and reliable performance.",
      heroDescription: "I create responsive interfaces and scalable web solutions with strong front-end polish, practical backend thinking, and a focus on real business outcomes.",
      aboutHeading: "Full stack development with strong visual execution.",
      aboutText: "I work across the complete web stack to turn ideas into polished digital products, combining user-friendly interfaces, structured code, and smooth interactions that feel professional on every device.",
      email: "hello@santanu.dev",
      phone: "+91 98765 43210",
      location: "Bhubaneswar, India",
      experience: "Full Stack Projects",
      socials: {
        LinkedIn: "https://www.linkedin.com/",
        GitHub: "https://github.com/",
        Behance: "https://www.behance.net/"
      }
    },
    strengths: [
      "Responsive full stack solutions for desktop, tablet, and mobile devices.",
      "Clean HTML, CSS, JavaScript, and modular architecture for maintainability.",
      "Smooth animations, polished interactions, and modern visual storytelling.",
      "Practical problem solving with attention to performance, usability, and scalability."
    ],
    stats: [
      { value: "12+", label: "Completed Projects" },
      { value: "Full", label: "Stack Focus" },
      { value: "100%", label: "Responsive Design" }
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "UI Animation",
      "Figma to Code",
      "Bootstrap",
      "Git & GitHub",
      "Node.js",
      "REST APIs",
      "Database Design",
      "Performance Optimization"
    ],
    projects: [
      {
        title: "Business Web Platform",
        description: "A modern full stack business website with responsive UI sections, engaging motion, and structured content presentation.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://example.com/project-one"
      },
      {
        title: "Portfolio Experience",
        description: "A personal full stack portfolio experience featuring immersive scroll effects, bold section transitions, and device-friendly layouts.",
        tags: ["Portfolio", "Responsive", "Animation"],
        link: "https://example.com/project-two"
      },
      {
        title: "Admin Content Dashboard",
        description: "A lightweight admin system for managing projects, skills, profile content, and contact messages through a protected login flow.",
        tags: ["Dashboard", "Local Storage", "Auth"],
        link: "https://example.com/project-three"
      }
    ],
    messages: []
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function deepMerge(base, override) {
    if (Array.isArray(base) || Array.isArray(override)) {
      return override !== undefined ? override : base;
    }

    if (typeof base === "object" && base !== null && typeof override === "object" && override !== null) {
      const result = { ...base };
      Object.keys(override).forEach((key) => {
        result[key] = deepMerge(base[key], override[key]);
      });
      return result;
    }

    return override !== undefined ? override : base;
  }

  function getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = clone(defaultData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }

    try {
      return deepMerge(clone(defaultData), JSON.parse(raw));
    } catch (error) {
      const fresh = clone(defaultData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetData() {
    const fresh = clone(defaultData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  function addMessage(message) {
    const data = getData();
    data.messages.unshift({
      id: Date.now(),
      submittedAt: new Date().toLocaleString(),
      ...message
    });
    saveData(data);
    return data.messages;
  }

  window.PortfolioStore = {
    STORAGE_KEY,
    defaultData,
    getData,
    saveData,
    resetData,
    addMessage
  };
})();
