import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Serve client folder
app.use(express.static(path.join(__dirname, "../client")))

const PORT = 3000

app.listen(PORT, () => {
  console.log(`bizzaOS running at http://localhost:${PORT}`)
})