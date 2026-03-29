// js/apps.js

import { createTabs } from "/utils/tabEngine.js";

export function AppsPage() {
  console.log("⚙️ Apps initialized");

  const root = document.getElementById("dialog-root");

  const main = root.querySelector("#settings-main");
  const tabs = root.querySelectorAll("#settings-aside .tab");
  const closeBtn = root.querySelector("#dialog-close");
  const dialog = document.getElementById("app-dialog");

  const pages = {
    general: {
      view: "/views/tabs/settings-general.html",
      script: "/js/tabs/settings-general.js",
      init: "GeneralTab"
    },
    user: {
      view: "/views/tabs/settings-user.html",
      script: "/js/tabs/settings-user.js",
      init: "UserTab"
    },
    system: {
      view: "/views/tabs/settings-system.html",
      script: "/js/tabs/settings-system.js",
      init: "SystemTab"
    }
  };

  // tab engine
  const settingsTabs = createTabs({
    root,
    main,
    tabs,
    pages,
    defaultTab: "general"
  });

  // close dialog
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}