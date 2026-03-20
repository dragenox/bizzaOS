import { Card } from "../components/card.js"

let currentPath = "/home"

const fsMock = {
  "/home": ["file1.pdf", "file2.png", "videos"],
  "/home/videos": ["movie.mp4"]
}

export function FileBrowserPage() {

  const container = document.createElement("div")
  container.className = "file-browser"

  const breadcrumb = document.createElement("div")
  breadcrumb.className = "breadcrumb"

  const grid = document.createElement("div")
  grid.className = "file-grid"

  function joinPath(base, next) {
    if (base === "/") return `/${next}`
    return `${base}/${next}`
  }

  function render() {
    grid.innerHTML = ""

    // update breadcrumb
    breadcrumb.textContent = currentPath

    // 🔥 back button FIRST
    if (currentPath !== "/home") {
      const back = Card({ title: ".." })
      back.firstElementChild.classList.add("file-card")

      back.addEventListener("click", () => {
        currentPath = currentPath.split("/").slice(0, -1).join("/") || "/home"
        render()
      })

      grid.appendChild(back)
    }

    const items = fsMock[currentPath] || []

    items.forEach(name => {
      const card = Card({ title: name })
      card.firstElementChild.classList.add("file-card")

      if (!name.includes(".")) {
        card.addEventListener("click", () => {
          currentPath = joinPath(currentPath, name)
          render()
        })
      }

      grid.appendChild(card)
    })
  }

  container.appendChild(breadcrumb)
  container.appendChild(grid)

  render()

  return container
}