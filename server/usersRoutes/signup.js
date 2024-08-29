import mongoose from "mongoose"
import userModel from "../usersModels/userModel.js"
import { COOKIE_OPTIONS, getToken, getRefreshToken } from "../authenticate.js"

const signup = (req, res, next) => {
  // Get inputs
  const { firstName, lastName, username, email, password } = req.body
  // If all fields aren't valid
  if (!firstName || !lastName || !username || !email || !password) {
    res.status(200).json({ success: false, message: "All required inputs must be entered." })
  }
  else {
    userModel.register(
      { firstName, lastName, username, email },
      password,
      (err, user) => {
        if (err) {
          res.status(200).json(err)
        }
        else {
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save()
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.status(200).json({ success: true, token })
        }
      }
    )
  }

}

export default signup