export function DashboardPage() {
  console.log("✅ Dashboard initialized");

  const main = document.querySelector(".main");

  if (main) {
    main.innerHTML = `
      <h1>Welcome to bizzaOS</h1>
      <p>This is your dashboard.</p>
    `;
  }
}