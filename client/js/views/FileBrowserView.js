export default function FileBrowserView(container) {
  // Root App Container
  const app = document.createElement("div");
  app.setAttribute("data-app", "");
  app.style.display = "flex";
  app.style.width = "100%";
  app.style.minHeight = "100vh";

  /*
   * =========================
   * SIDEBAR
   * =========================
   */
  const sidebar = document.createElement("aside");
  sidebar.setAttribute("data-sidebar", "");
  sidebar.style.display = "block";
  sidebar.style.width = "250px";
  sidebar.style.boxSizing = "border-box";

  // ----- Files Section -----
  const filesSection = document.createElement("section");
  filesSection.setAttribute("data-files", "");

  const filesTitle = document.createElement("h2");
  filesTitle.textContent = "Files";
  filesSection.appendChild(filesTitle);

  const fileItems = [
    "Root",
    "DATA",
    "Documents",
    "Downloads",
    "Gallery",
    "Media",
    "Games"
  ];

  const filesList = document.createElement("ul");

  fileItems.forEach(name => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = name;
    button.setAttribute("data-nav", name.toLowerCase());
    li.appendChild(button);
    filesList.appendChild(li);
  });

  filesSection.appendChild(filesList);

  // ----- Location Section -----
  const locationSection = document.createElement("section");
  locationSection.setAttribute("data-locations", "");

  const locationTitle = document.createElement("h2");
  locationTitle.textContent = "Location";
  locationSection.appendChild(locationTitle);

  const locationList = document.createElement("ul");

  ["CRBX1TB", "SGIF2TB", "WDMP2TB"].forEach(disk => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = disk;
    button.setAttribute("data-disk", disk);
    li.appendChild(button);
    locationList.appendChild(li);
  });

  locationSection.appendChild(locationList);

  // ----- Bottom Links -----
  const linkSection = document.createElement("section");
  linkSection.setAttribute("data-links", "");

  const linksList = document.createElement("ul");

  ["FilesDrop", "Shared"].forEach(link => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = link;
    button.setAttribute("data-link", link.toLowerCase());
    li.appendChild(button);
    linksList.appendChild(li);
  });

  linkSection.appendChild(linksList);

  sidebar.appendChild(filesSection);
  sidebar.appendChild(locationSection);
  sidebar.appendChild(linkSection);

  /*
   * =========================
   * MAIN CONTENT AREA
   * =========================
   */

  const main = document.createElement("main");
  main.setAttribute("data-main", "");
  main.style.display = "block";
  main.style.flex = "1";
  main.style.boxSizing = "border-box";

  // ----- Toolbar -----
  const toolbar = document.createElement("header");
  toolbar.setAttribute("data-toolbar", "");
  toolbar.style.display = "flex";
  toolbar.style.justifyContent = "space-between";

  const uploadButton = document.createElement("button");
  uploadButton.textContent = "Upload or create";
  uploadButton.setAttribute("data-action", "upload");

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.setAttribute("data-action", "close");

  toolbar.appendChild(uploadButton);
  toolbar.appendChild(closeButton);

  // ----- Breadcrumb -----
  const breadcrumb = document.createElement("nav");
  breadcrumb.setAttribute("data-breadcrumb", "");

  const breadcrumbList = document.createElement("ol");

  ["Root", "DATA"].forEach(path => {
    const li = document.createElement("li");
    li.textContent = path;
    li.setAttribute("data-path", path.toLowerCase());
    breadcrumbList.appendChild(li);
  });

  breadcrumb.appendChild(breadcrumbList);

  // ----- Content Grid -----
  const content = document.createElement("section");
  content.setAttribute("data-content", "");
  content.style.display = "block";

  const itemsGrid = document.createElement("div");
  itemsGrid.setAttribute("data-grid", "");
  itemsGrid.style.display = "grid";
  itemsGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
  itemsGrid.style.gap = "1rem";

  const folders = [
    "AppData",
    "Documents",
    "Downloads",
    "Gallery",
    "Games",
    "Media"
  ];

  folders.forEach(folder => {
    const article = document.createElement("article");
    article.setAttribute("data-item", "");

    const title = document.createElement("h3");
    title.textContent = folder;

    const meta = document.createElement("small");
    meta.textContent = "Modified date placeholder";

    article.appendChild(title);
    article.appendChild(meta);

    itemsGrid.appendChild(article);
  });

  content.appendChild(itemsGrid);

  main.appendChild(toolbar);
  main.appendChild(breadcrumb);
  main.appendChild(content);

  /*
   * =========================
   * ASSEMBLE
   * =========================
   */

  app.appendChild(sidebar);
  app.appendChild(main);

  container.innerHTML = "";
  container.appendChild(app);
}