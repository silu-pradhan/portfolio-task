(function () {
  window.PortfolioModules = window.PortfolioModules || {};

  function initPortfolioApp() {
    try {
      document.body.classList.add("animations-enabled");

      const store = window.PortfolioStore || {};
      const data = typeof store.getData === "function" ? store.getData() : {};
      const getPortfolioDom = window.PortfolioModules.getPortfolioDom || function () { return {}; };
      const dom = getPortfolioDom();

      if (typeof window.PortfolioModules.renderPortfolio === "function") {
        window.PortfolioModules.renderPortfolio(dom, data, window.PortfolioModules.initReveal);
      }

      if (typeof window.PortfolioModules.initNavigation === "function") {
        window.PortfolioModules.initNavigation(dom);
      }

      if (typeof window.PortfolioModules.initContactForm === "function") {
        window.PortfolioModules.initContactForm(dom, store);
      }

      if (typeof window.PortfolioModules.initSectionPointerEffects === "function") {
        window.PortfolioModules.initSectionPointerEffects();
      }

      if (typeof window.PortfolioModules.initCustomCursor === "function") {
        window.PortfolioModules.initCustomCursor(dom);
      }

      if (typeof window.PortfolioModules.initLoadAnimation === "function") {
        window.PortfolioModules.initLoadAnimation();
      }
    } catch (error) {
      console.error("Portfolio app failed to initialize:", error);
      document.body.classList.add("is-ready");
    }
  }

  window.PortfolioModules.initPortfolioApp = initPortfolioApp;
})();
