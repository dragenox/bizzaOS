function createSidebarItem(label, { active = false } = {}) {
  const template = document.getElementById("sidebar-item-template")
  const node = template.content.cloneNode(true)

  const el = node.querySelector(".sidebar-item")
  el.textContent = label

  if (active) el.classList.add("active")

  return el
}

function createSidebarSection(title, items = []) {
  const template = document.getElementById("sidebar-section-template")
  const node = template.content.cloneNode(true)

  node.querySelector(".section-title").textContent = title
  const list = node.querySelector(".section-list")

  items.forEach(item => {
    list.appendChild(createSidebarItem(item.label, item))
  })

  return node
}

export function Sidebar({ sections }) {
  const container = document.createElement("div")
  container.className = "sidebar-inner"

  sections.forEach(section => {
    container.appendChild(
      createSidebarSection(section.title, section.items)
    )
  })

  return container
}