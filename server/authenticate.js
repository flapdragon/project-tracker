import passport from "passport"
import jwt from "jsonwebtoken"

// Set if development
const development = process.env.NODE_ENV !== "production"

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !development,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRATION) * 1000,
  sameSite: "none"
}

export const getToken = user => {
  return jwt.sign(
    user,
    process.env.JWT_SECRET,
    { expiresIn: eval(process.env.SESSION_EXPIRATION) }
  )
}

export const getRefreshToken = user => {
  return jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRATION) }
  )
}

export const verifyUser = passport.authenticate("jwt", { session: false })
