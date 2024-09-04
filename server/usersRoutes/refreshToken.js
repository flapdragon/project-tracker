// import { signedCookies } from "cookie-parser"
import jwt from "jsonwebtoken"
import userModel from "../usersModels/userModel.js"
import { getToken, getRefreshToken } from "../authenticate.js"

const refreshToken = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      userModel.findOne({ _id: userId })
        .then(user => {
          if (user) {
            // Find the refresh token with the user record
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )

            if (tokenIndex === -1) {
              res.status(200).send("Unauthorized")
            }
            else {
              const token = getToken({ _id : userId })
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save()
              res.status(200).json({ success:  true, token })
            }
          }
        })
    }
    catch (err) {
      res.send(200).json(err)
    }
  }
  else {
    res.status(200).send("Unauthorized")
  }
}

export default refreshToken