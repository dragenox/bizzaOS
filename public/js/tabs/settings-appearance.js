// js/tabs/settings-appearance.js

export function AppearanceTab(root) {
  console.log("🎨 Appearance tab loaded");

  const select = root.querySelector("#themes");

  // themes logic (unchanged)
  const themes = [
    { id: "github", label: "GitHub Dark" },
    { id: "atom", label: "Atom Dark" },
    { id: "drage", label: "Drage Dark" }
  ];

  themes.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.label;
    select.appendChild(option);
  });

  const current = localStorage.getItem("theme") || "drage";
  select.value = current;

  select.addEventListener("change", (e) => {
    setTheme(e.target.value);
  });
}