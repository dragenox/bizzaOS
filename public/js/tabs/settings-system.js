// js/tabs/settings-system.js
export function SystemTab(root) {
  console.log("🎨 System tab loaded");

  const checkbox = root.querySelector('#terminal');

  // Load saved state
  const enabled = localStorage.getItem("bizzaOS-terminal-visible") === "true";
  checkbox.checked = enabled;

  // Listen for change
  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      "bizzaOS-terminal-visible",
      checkbox.checked
    );

    // Notify dashboard (important)
    window.dispatchEvent(new Event("terminal-toggle"));
  });
}