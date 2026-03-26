const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve renderer utils
app.use("/utils", express.static(path.join(__dirname, "utils")));

// Serve static files
// bootstrap-icons
app.use('/vendor/bootstrap-icons', express.static('node_modules/bootstrap-icons/font'))

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});