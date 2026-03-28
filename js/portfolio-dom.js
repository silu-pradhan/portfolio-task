(function () {
  window.PortfolioModules = window.PortfolioModules || {};

  window.PortfolioModules.getPortfolioDom = function getPortfolioDom() {
    return {
      brandName: document.getElementById("brandName"),
      heroTag: document.getElementById("heroTag"),
      heroTitle: document.getElementById("heroTitle"),
      heroDescription: document.getElementById("heroDescription"),
      projectsGrid: document.getElementById("projectsGrid"),
      skillsGrid: document.getElementById("skillsGrid"),
      contactInfo: document.getElementById("contactInfo"),
      socialLinks: document.getElementById("socialLinks"),
      form: document.getElementById("contactForm"),
      formStatus: document.getElementById("formStatus"),
      formPopup: document.getElementById("formPopup"),
      formPopupClose: document.getElementById("formPopupClose"),
      formPopupAction: document.getElementById("formPopupAction"),
      menuToggle: document.getElementById("menuToggle"),
      siteNav: document.getElementById("siteNav"),
      cursorDot: document.getElementById("cursorDot"),
      cursorRing: document.getElementById("cursorRing")
    };
  };
})();
