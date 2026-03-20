export function Sidebar({ content }) {
  const template = document.getElementById("sidebar-template")
  const node = template.content.cloneNode(true)

  if (content) {
    node.querySelector('[data-slot="content"]').appendChild(content)
  }

  return node
}