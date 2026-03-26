// utils/tabEngine.js

export function createTabs({ root, main, tabs, pages, defaultTab }) {
  const templateCache = {};
  const scriptCache = {};

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

  // load tab
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

    main.innerHTML = "<p>Loading...</p>";

    try {
      const content = await loadTemplate(view);

      // prevent race condition
      if (currentTab !== name) return;

      main.innerHTML = "";
      main.appendChild(content);

      if (script) {
        const module = await loadScript(script);

        if (init && module?.[init]) {
          module[init](root);
        }
      }

    } catch (err) {
      console.error("Tab load error:", err);
      main.innerHTML = "<p>Error loading page</p>";
    }
  }

  // attach listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      loadTab(tab.dataset.tab);
    });
  });

  // init
  (async () => {
    await loadTab(defaultTab);

    // preload others
    Object.entries(pages).forEach(([name, page]) => {
      if (name === defaultTab) return;

      loadTemplate(page.view);

      if (page.script) {
        loadScript(page.script);
      }
    });
  })();

  // expose API (important)
  return {
    load: loadTab,

    reload: () => loadTab(currentTab),

    getCurrent: () => currentTab
  };
}