import passport from "passport"
import { LocalStrategy } from "passport-local"
import userModel from "../users/userModel.js"

console.log(userModel)

// Authentication, login/signup
passport.use(new LocalStrategy(userModel.authenticate()))

// Serialization
passport.serializeUser(userModel.serializeUser())
