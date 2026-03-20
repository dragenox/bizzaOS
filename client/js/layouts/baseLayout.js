export function createLayout({ navbar, aside, main, footer, variant }) {
  const template = document.getElementById("base-layout")
  const node = template.content.cloneNode(true)

  const app = node.querySelector(".app")

  if (variant === "full") {
    app.classList.add("layout-full")
  }

  if (navbar) node.querySelector('[data-slot="navbar"]').appendChild(navbar)
  if (aside) node.querySelector('[data-slot="aside"]').appendChild(aside)
  if (main) node.querySelector('[data-slot="main"]').appendChild(main)
  if (footer) node.querySelector('[data-slot="footer"]').appendChild(footer)

  return node
}