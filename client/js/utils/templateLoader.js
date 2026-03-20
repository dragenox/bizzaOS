const loadedTemplates = new Set()

export async function loadTemplate(path) {
  if (loadedTemplates.has(path)) return

  const res = await fetch(path)
  const html = await res.text()

  const container = document.createElement("div")
  container.innerHTML = html

  // Append all templates to DOM
  container.querySelectorAll("template").forEach(t => {
    document.body.appendChild(t)
  })

  loadedTemplates.add(path)
}