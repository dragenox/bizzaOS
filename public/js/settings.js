// js/settings.js
// js/settings.js
export function SettingsPage() {
  console.log("Settings initialized");

  // scope everything to dialog root
  const root = document.getElementById("dialog-root");

  const main = root.querySelector("#settings-main");
  const tabs = root.querySelectorAll("#settings-aside .tab");
  const closeBtn = root.querySelector("#dialog-close");
  const dialog = document.getElementById("app-dialog");

  // tab config (view + optional script)
  const pages = {
    general: {
      view: "/views/tabs/settings-general.html",
      script: "/js/tabs/settings-general.js",
      init: "GeneralTab"
    },
    appearance: {
      view: "/views/tabs/settings-appearance.html",
      script: "/js/tabs/settings-appearance.js",
      init: "AppearanceTab"
    },
    system: {
      view: "/views/tabs/settings-system.html",
      script: "/js/tabs/settings-system.js",
      init: "SystemTab"
    }
  };

  // caches
  const templateCache = {};
  const scriptCache = {};

  // prevent race conditions
  let currentTab = null;

  // load HTML template
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

    // cache original fragment
    templateCache[path] = content;

    return content.cloneNode(true);
  }

  // load JS module
  async function loadScript(path) {
    if (scriptCache[path]) {
      return scriptCache[path];
    }

    const module = await import(path);
    scriptCache[path] = module;
    return module;
  }

  // load tab (HTML + JS)
  async function loadTab(name) {
    currentTab = name;

    // update active UI
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === name);
    });

    const page = pages[name];

    if (!page) {
      main.innerHTML = "<p>Not found</p>";
      return;
    }

    const { view, script, init } = page;

    // loading state
    main.innerHTML = "<p>Loading...</p>";

    try {
      // 1. load HTML
      const content = await loadTemplate(view);

      // ignore outdated responses
      if (currentTab !== name) return;

      main.innerHTML = "";
      main.appendChild(content);

      // 2. load JS (optional)
      if (script) {
        const module = await loadScript(script);

        // 3. run init function (if exists)
        if (init && module?.[init]) {
          module[init](root);
        }
      }

    } catch (err) {
      console.error("Tab load error:", err);
      main.innerHTML = "<p>Error loading page</p>";
    }
  }

  // attach tab click listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", async () => {
      const tabName = tab.dataset.tab;
      await loadTab(tabName);
    });
  });

  // initial load + preload everything
  (async () => {
    await loadTab("general");

    // preload HTML + JS in background
    Object.values(pages).forEach(page => {
      loadTemplate(page.view);

      if (page.script) {
        loadScript(page.script);
      }
    });
  })();

  // close dialog
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}