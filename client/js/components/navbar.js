export function Navbar({ left, center, right }) {
  const template = document.getElementById("navbar-template")
  const node = template.content.cloneNode(true)

  if (left) node.querySelector('[data-slot="left"]').appendChild(left)
  if (center) node.querySelector('[data-slot="center"]').appendChild(center)
  if (right) node.querySelector('[data-slot="right"]').appendChild(right)

  return node
}