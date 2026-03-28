(function () {
  window.PortfolioModules = window.PortfolioModules || {};

  function initPortfolioApp() {
    const store = window.PortfolioStore;
    const data = store.getData();
    const dom = window.PortfolioModules.getPortfolioDom();

    window.PortfolioModules.renderPortfolio(dom, data, window.PortfolioModules.initReveal);
    window.PortfolioModules.initNavigation(dom);
    window.PortfolioModules.initContactForm(dom, store);
    window.PortfolioModules.initSectionPointerEffects();
    window.PortfolioModules.initCustomCursor(dom);
    window.PortfolioModules.initLoadAnimation();
  }

  window.PortfolioModules.initPortfolioApp = initPortfolioApp;
})();
