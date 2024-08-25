import mongoose from "mongoose"

const sessionSchema = new Schema({
  refreshToken: {
    type: String,
    default: ""
  }
})

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  authStrategy: {
    type: String,
    default: "local"
  },
  refreshToken: {
    type: [ sessionSchema ]
  }
})

export default userSchema
