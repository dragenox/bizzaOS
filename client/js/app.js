import { createLayout } from "./layouts/baseLayout.js"
import { Navbar } from "./components/navbar.js"
import { Sidebar } from "./components/sidebar.js"
import { createModal } from "./components/modal.js"

function textNode(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div
}

// Navbar
const navbar = Navbar({
  left: textNode("bizzaOS"),
  right: textNode("Profile")
})

// Sidebar
const sidebar = Sidebar({
  content: textNode("Sidebar Content")
})

// Main
const main = textNode("Dashboard")

const layout = createLayout({
  navbar,
  aside: sidebar,
  main,
  variant: "dashboard"
})

document.getElementById("app-root").appendChild(layout)

// Test Modal after 2s
setTimeout(() => {
  const modalLayout = createLayout({
    navbar: textNode("App Store"),
    aside: textNode("Menu"),
    main: textNode("Editor"),
    variant: "dashboard"
  })

  const modal = createModal(modalLayout)
  document.getElementById("modal-root").appendChild(modal)
}, 2000)