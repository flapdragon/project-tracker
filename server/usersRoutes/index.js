import express from "express"
import signup from "./signup.js"

const usersRouter = express.Router()

usersRouter.post("/signup", signup)

export default usersRouter