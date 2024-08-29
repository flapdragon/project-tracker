import axios from "axios"

let action = "signup"

switch (action) {
  case "signup":
    axios.post("http://localhost:8000/users/signup", {
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
}