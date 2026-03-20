export function createModal(contentNode) {
  const template = document.getElementById("modal-template")
  const node = template.content.cloneNode(true)

  const modal = node.querySelector(".modal")
  const overlay = node.querySelector(".modal-overlay")
  const content = node.querySelector('[data-slot="content"]')

  content.appendChild(contentNode)

  overlay.addEventListener("click", () => {
    modal.remove()
  })

  return modal
}