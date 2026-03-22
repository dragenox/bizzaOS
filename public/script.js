// script.js
import { DashboardPage } from ".js"

function showContent() {
    const temp = document.getElementById("body");
    const view = temp.content.cloneNode(true);
    document.body.appendChild(view);
}