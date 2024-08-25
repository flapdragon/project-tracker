import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
import userSchema from "./userSchema.js"

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken
    return ret
  }
})

userSchema.plugin(passportLocalMongoose)

const userModel = mongoose.model("User", userSchema)

export default userModel