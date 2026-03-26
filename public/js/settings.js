// js/settings.js
export function SettingsPage() {
  console.log("⚙️ Settings initialized");

  // scope everything to dialog root (prevents leaks)
  const root = document.getElementById("dialog-root");

  const main = root.querySelector("#settings-main");
  const tabs = root.querySelectorAll("#settings-aside .tab");
  const closeBtn = root.querySelector("#dialog-close");
  const dialog = document.getElementById("app-dialog");

  // tab → template path map
  const pages = {
    general: "/views/tabs/settings-general.html",
    appearance: "/views/tabs/settings-appearance.html",
    system: "/views/tabs/settings-system.html"
  };

  // template cache
  const templateCache = {};

  // track latest tab (prevents race condition)
  let currentTab = null;

  // template loader
  async function loadTemplate(path) {
    if (templateCache[path]) {
      return templateCache[path].cloneNode(true);
    }

    const res = await fetch(path);
    const html = await res.text();

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const template = temp.querySelector("template");

    if (!template) {
      throw new Error(`No <template> found in ${path}`);
    }

    const content = template.content.cloneNode(true);

    // cache original
    templateCache[path] = content;

    return content.cloneNode(true);
  }

  // tab loader
  async function loadTab(name) {
    currentTab = name;

    // update active tab UI
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === name);
    });

    const path = pages[name];

    if (!path) {
      main.innerHTML = "<p>Not found</p>";
      return;
    }

    // loading state
    main.innerHTML = "<p>Loading...</p>";

    try {
      const content = await loadTemplate(path);

      // ignore outdated responses
      if (currentTab !== name) return;

      main.innerHTML = "";
      main.appendChild(content);
    } catch (err) {
      console.error("❌ Tab load error:", err);
      main.innerHTML = "<p>Error loading page</p>";
    }
  }

  // attach tab listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", async () => {
      const tabName = tab.dataset.tab;
      await loadTab(tabName);
    });
  });

  // initial load + preload others
  (async () => {
    await loadTab("general");

    // preload remaining tabs (background)
    Object.values(pages).forEach(path => {
      loadTemplate(path);
    });
  })();

  // close dialog
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}