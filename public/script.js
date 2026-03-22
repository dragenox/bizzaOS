import { render } from "/utils/renderer.js";
import { DashboardPage } from "./js/dashboard.js";

async function init() {
  await render("/views/dashboard.html", "app");
  DashboardPage();
}

init();