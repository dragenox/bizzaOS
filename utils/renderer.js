export async function render(viewPath, containerId) {
  try {
    const res = await fetch(viewPath);
    const html = await res.text();

    const template = document.createElement("template");
    template.innerHTML = html;

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    container.appendChild(template.content.cloneNode(true));
  } catch (err) {
    console.error("Render error:", err);
  }
}