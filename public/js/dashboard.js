// js/dashboard.js
// import Sortable from "sortablejs";
import Sortable from "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/+esm";
import { openDialog } from "/utils/dialog.js";

export function DashboardPage() {
  console.log("✅ Dashboard initialized");

  const main = document.querySelector(".main");
  const select = document.getElementById("themes");

  const appsBtn = document.getElementById("appsManager");
  const filesBtn = document.getElementById("filesManager");
  const settingsBtn = document.querySelector('[commandfor="settings-dialog"]');

  const terminalApp = document.getElementById("terminal");

  // function to apply state
  function updateTerminalVisibility() {
    const enabled = localStorage.getItem("bizzaOS-terminal-visible") === "true";

    terminalApp.classList.toggle("hidden", !enabled);
  }

  // run on load
  updateTerminalVisibility();

  // listen for changes from settings
  window.addEventListener("terminal-toggle", updateTerminalVisibility);

  // Reorder Apps Logic
  const toggle = document.getElementById("reorderApps");
  const apps = document.querySelector(".apps");

  let sortable = null;

  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;

    // toggle UI mode
    apps.classList.toggle("reorder-mode", enabled);

    if (enabled && !sortable) {
      // Enable drag
      sortable = new Sortable(apps, {
        animation: 150,
        // only drag via grip icon
        handle: ".bi-grip-horizontal",

        // cannot drag system apps
        filter: ".system",
        preventOnFilter: false,

        ghostClass: "drag-ghost",
        chosenClass: "drag-chosen",
        // smoother feel
        dragClass: "drag-dragging",

        onStart: () => {
          document.body.classList.add("drag-active");
        },

        onMove: (evt) => {
          const dragged = evt.dragged;
          const related = evt.related;

          // prevent dropping before system apps
          if (related && related.classList.contains("system")) {
            return false;
          }

          return true;
        },

        onEnd: () => {
          document.body.classList.remove("drag-active");

          // Save ONLY non-system apps order
          const order = [...apps.children]
            .filter(el => !el.classList.contains("system"))
            .map(el => el.querySelector(".label")?.textContent.trim());

          console.log("📦 New Order:", order);

          // TODO: replace with real IDs later
          localStorage.setItem("bizzaOS-app-order", JSON.stringify(order));
        }
      });

    } else if (!enabled && sortable) {
      // Disable drag
      sortable.destroy();
      sortable = null;
    }
  });

  // click outside to disable reorder mode
  document.addEventListener("click", (e) => {
    const isClickInsideApps = apps.contains(e.target);
    const isClickOnToggle = toggle.closest(".reorder-toggle").contains(e.target);

    if (!isClickInsideApps && !isClickOnToggle) {
      toggle.checked = false;
      apps.classList.remove("reorder-mode");
    }
  });

  // Dialog Overrides
  appsBtn.removeAttribute("command");
  filesBtn.removeAttribute("command");
  settingsBtn.removeAttribute("command");

  appsBtn.addEventListener("click", () => {
    openDialog({
      view: "/views/apps.html",
      script: "/js/apps.js",
      style: "/css/apps.css",
      init: "AppsPage"
    });
  });

  filesBtn.addEventListener("click", () => {
    openDialog({
      view: "/views/files.html",
      script: "/js/files.js",
      style: "/css/files.css",
      init: "FilesPage"
    });
  });

  settingsBtn.addEventListener("click", () => {
    openDialog({
      view: "/views/settings.html",
      script: "/js/settings.js",
      style: "/css/settings.css",
      init: "SettingsPage"
    });
  });



  // Restore Order
  const savedOrder = localStorage.getItem("bizzaOS-app-order");

  if (savedOrder) {
    try {
      const order = JSON.parse(savedOrder);

      const items = [...apps.children];

      items.sort((a, b) => {
        const aText = a.querySelector(".label")?.textContent.trim();
        const bText = b.querySelector(".label")?.textContent.trim();

        // return order.indexOf(aText) - order.indexOf(bText);
        return (order.indexOf(aText) || 999) - (order.indexOf(bText) || 999);
      });

      items.forEach(el => apps.appendChild(el));

    } catch (err) {
      console.warn("⚠️ Failed to restore order", err);
    }
  }
}