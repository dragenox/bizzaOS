// js/dashboard.js
export function DashboardPage() {
  console.log("✅ Dashboard initialized");

  const main = document.querySelector(".main");
  const select = document.getElementById("themes");

  const themes = [
    { id: "github", label: "GitHub Dark" },
    { id: "atom", label: "Atom Dark" },
    { id: "drage", label: "Drage Dark" }
  ];

  // populate dropdown
  themes.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.label;
    select.appendChild(option);
  });

  // set current selected theme
  const current = localStorage.getItem("theme") || "drage";
  select.value = current;

  // change theme on select
  select.addEventListener("change", (e) => {
    setTheme(e.target.value);
  });

  // main content
  if (main) {
    main.innerHTML = `
      <h1>Welcome to bizzaOS</h1>
      <p>This is your dashboard.</p>
    `;
  }
}