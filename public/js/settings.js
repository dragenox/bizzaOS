// js/settings.js
export function SettingsPage() {
  console.log("⚙️ Settings initialized");

  const main = document.getElementById("settings-main");
  const tabs = document.querySelectorAll("#settings-aside .tab");
  const closeBtn = document.getElementById("dialog-close");
  const dialog = document.getElementById("app-dialog");

  // 🧠 content map (like routing inside settings)
  const pages = {
    general: `
      <h1>General</h1>
      <p>Basic system settings</p>
    `,
    appearance: `
      <h1>Appearance</h1>
      <p>Theme, colors, UI options</p>
    `,
    system: `
      <h1>System</h1>
      <p>Advanced system controls</p>
    `
  };

  // function to switch tab
  function loadTab(name) {
    // update active button
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === name);
    });

    // update main content
    main.innerHTML = pages[name] || "<p>Not found</p>";
  }

  // attach listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      loadTab(tab.dataset.tab);
    });
  });

  // default tab
  loadTab("general");

  // close dialog
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}