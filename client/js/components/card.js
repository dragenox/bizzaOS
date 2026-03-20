export function Card({ title, icon, meta }) {
  const template = document.getElementById("card-template")
  const node = template.content.cloneNode(true)

  node.querySelector(".card-title").textContent = title
  if (meta) node.querySelector(".card-meta").textContent = meta

  if (icon) {
    node.querySelector(".card-icon").appendChild(icon)
  }

  return node
}