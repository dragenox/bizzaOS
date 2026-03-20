import { loadTemplate } from "./utils/templateLoader.js"

import { createLayout } from "./layouts/baseLayout.js"
import { Navbar } from "./components/navbar.js"
import { Sidebar } from "./components/sidebar.js"
import { DashboardPage } from "./pages/dashboard.js"

function textNode(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div
}

// Template loader
async function init() {
    await Promise.all([
        loadTemplate("/templates/baseLayout.html"),
        loadTemplate("/templates/navbar.html"),
        loadTemplate("/templates/sidebar.html"),
        loadTemplate("/templates/sidebarSection.html"),
        loadTemplate("/templates/sidebarItem.html"),
        loadTemplate("/templates/card.html"),
        loadTemplate("/templates/modal.html"),
    ])

    // Navbar
    const navbar = Navbar({
        left: textNode("bizzaOS"),
        right: textNode("Profile")
    })

    // Sidebar (REAL DATA STRUCTURE)
    const sidebar = Sidebar({
        sections: [
            {
                title: "Apps",
                items: [
                    { label: "File Browser", active: true },
                    { label: "Jellyfin" },
                    { label: "Immich" }
                ]
            },
            {
                title: "System",
                items: [
                    { label: "Settings" },
                    { label: "Logs" }
                ]
            }
        ]
    })

    // Main
    const main = DashboardPage()

    const layout = createLayout({
        navbar,
        aside: sidebar,
        main,
        variant: "dashboard"
    })

    document.getElementById("app-root").appendChild(layout)
}

init()