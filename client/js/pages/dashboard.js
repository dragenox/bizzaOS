import { Card } from "../components/card.js"

export function DashboardPage() {
  const container = document.createElement("div")
  container.className = "dashboard-grid"

  const apps = [
    { title: "File Browser" },
    { title: "Jellyfin" },
    { title: "Immich" },
    { title: "qBittorrent" }
  ]

  apps.forEach(app => {
    container.appendChild(Card(app))
  })

  return container
}