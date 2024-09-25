import express from "express"
import passport from "passport"
import { verifyUser } from "../authenticate.js"
import signup from "./signup.js"
import login from "./login.js"
import refreshToken from "./refreshToken.js"
import me from "./me.js"

const usersRouter = express.Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", passport.authenticate("local"), login)
usersRouter.post("/refreshToken", refreshToken)
usersRouter.get("/me", verifyUser, me)

export default usersRouter