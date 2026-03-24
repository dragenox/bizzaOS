// utils/dialog.js
export async function openDialog({ view, script, style, init }) {
  const dialog = document.getElementById("app-dialog");
  const root = document.getElementById("dialog-root");

  // 1. Load HTML
  const html = await fetch(view).then(res => res.text());
  root.innerHTML = html;

  // 2. Load CSS (if not already loaded)
  if (style && !document.querySelector(`link[href="${style}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style;
    document.head.appendChild(link);
  }

  // 3. Load JS module
  let module = null;
  if (script) {
    module = await import(script);
  }

  // 4. Open dialog
  dialog.showModal();

  // 5. Init page
  if (init && module && module[init]) {
    module[init]();
  }
}