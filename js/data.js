(function () {
  const STORAGE_KEY = "portfolio-pro-data";
  let memoryStore = "";

  const defaultData = {
    version: 4,
    profile: {
      name: "Santanu Pradhan",
      roleTag: "Full Stack Developer",
      heroTitle: "Santanu Pradhan",
      heroDescription: "Full Stack Developer focused on responsive interfaces, scalable web solutions, and clean user experiences that feel professional across every device.",
      aboutHeading: "Full stack development with strong visual execution.",
      aboutText: "I work across the complete web stack to turn ideas into polished digital products, combining user-friendly interfaces, structured code, and smooth interactions that feel professional on every device.",
      email: "santanupradhan599@gmail.com",
      phone: "+91 8093634144",
      location: "Bhubaneswar, India",
      experience: "Full Stack Projects",
      socials: {
        LinkedIn: "https://www.linkedin.com/in/santanu-pradhan-076890376/",
        GitHub: "https://github.com/silu-pradhan"
      }
    },
    strengths: [
      "Responsive full stack solutions for desktop, tablet, and mobile devices.",
      "Clean HTML, CSS, JavaScript, and modular architecture for maintainability.",
      "Smooth animations, polished interactions, and modern visual storytelling.",
      "Practical problem solving with attention to performance, usability, and scalability."
    ],
   
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "UI Animation",
      "Bootstrap",
      "Git & GitHub",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB"
      
    ],
    projects: [
      {
        title: "CollaborateCode Editor",
        description: "A real-time collaborative code editor that allows multiple users to join a shared room and write, edit, and execute code together simultaneously. The application supports multi-language coding, live synchronization using WebSockets/Yjs, and integrated chat for seamless communication between users",
        tags: ["React","WebSockets","Yjs","Node.js","Express.js","MongoDB"],
        link: "https://github.com/silu-pradhan/multi-userCodeEditor.git"
      },
      {
        title: "Blood Bank Management System",
        description: "The Blood Bank Management System (BBMS) is a web-based platform designed to streamline the management of blood donations, hospital requests, and inventory tracking. By replacing manual processes with a structured digital workflow, BBMS enables hospitals and blood banks to access real-time inventory, maintain donor records, and process blood requests efficiently.",
        tags: ["Node.js","Express.js","MongoDB","REST APIs"],
        link: "https://github.com/silu-pradhan/blood-bank.git"
      },
      {
        title: "Neomeet",
        description: "NeoMeet is a modern, real-time video conferencing application that enables seamless communication through high-quality video calls, screen sharing, and instant messaging. Built with React and Node.js, it provides an intuitive interface for hosting and joining virtual meetings with minimal setup.",
        tags: ["React","WebRTC","Node.js","Express.js","Socket.io"],
        link: "https://github.com/silu-pradhan/neomeet.git"
      }
    ],
    messages: []
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function storageAvailable() {
    try {
      const testKey = "__portfolio_test__";
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readStorage() {
    if (storageAvailable()) {
      return window.localStorage.getItem(STORAGE_KEY);
    }

    return memoryStore || null;
  }

  function writeStorage(value) {
    if (storageAvailable()) {
      window.localStorage.setItem(STORAGE_KEY, value);
      return;
    }

    memoryStore = value;
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
    const raw = readStorage();
    if (!raw) {
      const fresh = clone(defaultData);
      writeStorage(JSON.stringify(fresh));
      return fresh;
    }

    try {
      const parsed = JSON.parse(raw);
      const merged = deepMerge(clone(defaultData), parsed);

      if (parsed.version !== defaultData.version) {
        merged.version = defaultData.version;
        merged.profile = {
          ...merged.profile,
          name: defaultData.profile.name,
          roleTag: defaultData.profile.roleTag,
          heroTitle: defaultData.profile.heroTitle,
          heroDescription: defaultData.profile.heroDescription,
          aboutHeading: defaultData.profile.aboutHeading,
          aboutText: defaultData.profile.aboutText,
          email: defaultData.profile.email,
          phone: defaultData.profile.phone,
          location: defaultData.profile.location,
          experience: defaultData.profile.experience,
          socials: clone(defaultData.profile.socials)
        };
        merged.skills = clone(defaultData.skills);
        merged.projects = clone(defaultData.projects);
        writeStorage(JSON.stringify(merged));
      }

      return merged;
    } catch (error) {
      const fresh = clone(defaultData);
      writeStorage(JSON.stringify(fresh));
      return fresh;
    }
  }

  function saveData(data) {
    writeStorage(JSON.stringify(data));
  }

  function resetData() {
    const fresh = clone(defaultData);
    writeStorage(JSON.stringify(fresh));
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
