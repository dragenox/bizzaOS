// js/dashboard.js
// import Sortable from "sortablejs";
import Sortable from "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/+esm";
import { openDialog } from "/utils/dialog.js";

export function DashboardPage() {
  console.log("✅ Dashboard initialized");

  const main = document.querySelector(".main");
  const select = document.getElementById("themes");

  const filesBtn = document.querySelector('[commandfor="files-dialog"]');
  const settingsBtn = document.querySelector('[commandfor="settings-dialog"]');

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

        ghostClass: "drag-ghost",
        chosenClass: "drag-chosen",

        // optional: smoother feel
        dragClass: "drag-dragging",

        onStart: () => {
          document.body.classList.add("drag-active");
        },

        onEnd: () => {
          document.body.classList.remove("drag-active");

          // Save order (basic version)
          const order = [...apps.children].map((el, index) => {
            return el.querySelector(".label")?.textContent.trim();
          });

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
  filesBtn.removeAttribute("command");
  settingsBtn.removeAttribute("command");

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

  // Restore Order (optional but useful)
  const savedOrder = localStorage.getItem("bizzaOS-app-order");

  if (savedOrder) {
    try {
      const order = JSON.parse(savedOrder);

      const items = [...apps.children];

      items.sort((a, b) => {
        const aText = a.querySelector(".label")?.textContent.trim();
        const bText = b.querySelector(".label")?.textContent.trim();

        return order.indexOf(aText) - order.indexOf(bText);
      });

      items.forEach(el => apps.appendChild(el));

    } catch (err) {
      console.warn("⚠️ Failed to restore order", err);
    }
  }
}