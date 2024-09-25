import axios from "axios"

const authService = {
  authLogin: async (username, password) => {
    return await axios.post(`${process.env.REACT_APP_SERVER}/users/login`, { username, password }, { headers: { "Content-Type": "application/json" }})
  },
  authSignup: async (firstName, lastName, username, email, password) => {
    return await axios.post(`${process.env.REACT_APP_SERVER}/users/signup`, { firstName, lastName, username, email, password }, { headers: { "Content-Type": "application/json" }})
  }
}

export default authService
