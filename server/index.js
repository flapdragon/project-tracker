import "dotenv/config"
import express, { application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import "./connectdb.js" // MongoDB
import "./strategies/jwtStrategy.js" // JWT Strategy
import "./strategies/localStrategy.js" // Local Strategy
import usersRouter from "./usersRoutes/index.js"

const app = express()
app.use(express.json()) // Parse request body as JSON
app.use(cookieParser(process.env.COOKIE_SECRET))
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

// Add Passport to Express
app.use(passport.initialize())

// Temp route
app.get("/", (req, res) => {
  res.send({ status: "Success!" })
})

// Users routes
app.use("/users", usersRouter)

// Start Express
app.listen(port, () => {
  console.log(`Project Tracker listening on port ${port}`)
})