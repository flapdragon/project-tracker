import express from "express"
import passport from "passport"
import signup from "./signup.js"
import login from "./login.js"

const usersRouter = express.Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", passport.authenticate("local"), login)

export default usersRouter