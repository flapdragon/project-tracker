import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import userModel from "../usersModels/userModel.js"

// Authentication, login/signup
passport.use(new LocalStrategy(userModel.authenticate()))

// Serialization
passport.serializeUser(userModel.serializeUser())
