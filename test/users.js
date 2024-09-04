import axios from "axios"

const server = "http://localhost:8000/users"
let action = "refreshToken"

switch (action) {
  case "signup":
    axios.post(`${server}/signup`, {
      firstName: "test2", lastName: "test2", username: "test2", email: "test2@test.com", password: "test"
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    console.log("signup")
    break
  case "login":
    axios.post(`${server}/login`, {
      username: "test", password: "test"
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    break
  case "refreshToken":
    axios.post(`${server}/refreshToken`, {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmZWU2ZjZlYmU4YjI0MTI3YTBlNTUiLCJpYXQiOjE3MjQ5NzM4NDYsImV4cCI6MTcyNDk3NDc0Nn0.fo4PKSL6WJhGZRj3AuAVmBikZb3ZLaHlBqm94rgJhB8'})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
}