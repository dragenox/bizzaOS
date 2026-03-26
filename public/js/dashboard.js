// js/dashboard.js
import { openDialog } from "/utils/dialog.js";

export function DashboardPage() {
  console.log("✅ Dashboard initialized");

  const main = document.querySelector(".main");
  const select = document.getElementById("themes");

  const filesBtn = document.querySelector('[commandfor="files-dialog"]');
  const settingsBtn = document.querySelector('[commandfor="settings-dialog"]');

  // ❌ REMOVE command="show-modal" behavior
  filesBtn.removeAttribute("command");
  settingsBtn.removeAttribute("command");

  // ✅ Files
  filesBtn.addEventListener("click", () => {
    openDialog({
      view: "/views/files.html",
      script: "/js/files.js",
      style: "/css/files.css",
      init: "FilesPage"
    });
  });

  // ✅ Settings
  settingsBtn.addEventListener("click", () => {
    openDialog({
      view: "/views/settings.html",
      script: "/js/settings.js",
      style: "/css/settings.css",
      init: "SettingsPage"
    });
  });

  // // themes logic (unchanged)
  // const themes = [
  //   { id: "github", label: "GitHub Dark" },
  //   { id: "atom", label: "Atom Dark" },
  //   { id: "drage", label: "Drage Dark" }
  // ];

  // themes.forEach(theme => {
  //   const option = document.createElement("option");
  //   option.value = theme.id;
  //   option.textContent = theme.label;
  //   select.appendChild(option);
  // });

  // const current = localStorage.getItem("theme") || "drage";
  // select.value = current;

  // select.addEventListener("change", (e) => {
  //   setTheme(e.target.value);
  // });

  if (main) {
    main.innerHTML = `
      <h1>Welcome to bizzaOS</h1>
      <p>This is your dashboard.</p>
    `;
  }
}