import mongoose from "mongoose"

const mongoURL = process.env.MONGODB_CONNECTION_STRING

const connect = mongoose.connect(mongoURL)

connect
  .then(db => {
    console.log(`Connected to ${mongoURL}`)
  })
  .catch(err => {
    console.log(err)
  })