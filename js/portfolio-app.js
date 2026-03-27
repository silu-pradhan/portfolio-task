import { getPortfolioDom } from "./portfolio-dom.js";
import {
  initContactForm,
  initCustomCursor,
  initLoadAnimation,
  initNavigation,
  initReveal,
  initSectionPointerEffects
} from "./portfolio-interactions.js";
import { renderPortfolio } from "./portfolio-render.js";

export function initPortfolioApp() {
  const store = window.PortfolioStore;
  const data = store.getData();
  const dom = getPortfolioDom();

  renderPortfolio(dom, data, initReveal);
  initNavigation(dom);
  initContactForm(dom, store);
  initSectionPointerEffects();
  initCustomCursor(dom);
  initLoadAnimation();
}
