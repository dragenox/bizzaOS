const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve renderer utils as well
app.use("/utils", express.static(path.join(__dirname, "utils")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});