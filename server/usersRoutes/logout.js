import userModel from "../usersModels/userModel.js"
import { COOKIE_OPTIONS } from "../authenticate.js"

const logout = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  
  userModel.findById({ _id: req.user._id })
    .then(user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )

      if (tokenIndex === -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }

      user.save((err, user) => {
        if (err) {
          res.status(200).json(err)
        }
        else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.status(200).json({ success: true })
        }
      })
    })
}

export default logout