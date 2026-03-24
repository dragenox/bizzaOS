// script.js
import { render } from "/utils/renderer.js";
import { DashboardPage } from "./js/dashboard.js";

function setTheme(name) {
  const root = document.documentElement;

  root.classList.forEach(cls => {
    if (cls.startsWith("theme-")) {
      root.classList.remove(cls);
    }
  });

  root.classList.add(`theme-${name}`);

  localStorage.setItem("theme", name);
}

function loadTheme() {
  const saved = localStorage.getItem("theme") || "github";
  setTheme(saved);
}

async function init() {
  loadTheme();
  await render("/views/dashboard.html", "app");
  DashboardPage();
}

init();

window.setTheme = setTheme;