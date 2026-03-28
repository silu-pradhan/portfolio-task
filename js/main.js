(function () {
  function bootPortfolio() {
    if (window.PortfolioModules && typeof window.PortfolioModules.initPortfolioApp === "function") {
      window.PortfolioModules.initPortfolioApp();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPortfolio, { once: true });
  } else {
    bootPortfolio();
  }
})();
