import "dotenv/config"
import express from "express"
import cors from "cors"
import "./connectdb.js"

const app = express()
app.use(express.json()) // Parse request body as JSON
const port = 8000

// CORS
// Get whitelisted domains from env
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []
// Set CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}
// Use CORS
app.use(cors(corsOptions))

// Temp route
app.get("/", (req, res) => {
  res.send({ status: "Success!" })
})

// Start Express
app.listen(port, () => {
  console.log(`Project Tracker listening on port ${port}`)
})