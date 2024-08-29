import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import userModel from "../usersModels/userModel.js"

// JWT Strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// For authenticated
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    userModel.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      }
      else {
        return done(null, false)
      }
    })
  })
)
