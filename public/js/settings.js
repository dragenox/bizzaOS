// js/settings.js
export function SettingsPage() {
  console.log("⚙️ Settings initialized");

  const main = document.getElementById("settings-main");
  const closeBtn = document.getElementById("dialog-close");
  const dialog = document.getElementById("app-dialog");

  if (main) {
    main.innerHTML = `
      <h1>Settings</h1>
      <p>Configure your system</p>
    `;
  }

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}