import mongoose from "mongoose"
import userModel from "../usersModels/userModel.js"
import { COOKIE_OPTIONS, getToken, getRefreshToken } from "../authenticate.js"

const login = (req, res, next) => {
  const { _id } = req.user
  const token = getToken({ _id })
  const refreshToken = getRefreshToken({ _id })
  try {
    userModel.findById(_id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save()
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        res.status(200).json({ success: true, token })
      }
    )
  }
  catch (err) {
    res.status(200).json(err)
  }

}

export default login