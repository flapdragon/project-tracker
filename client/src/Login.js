import { useState } from "react"

const Login = () => {
  const [ email, setEmail ] = useState("")
  const [ emailNotValid, setEmailNotValid ] = useState(false)
  const [ password, setPassword ] = useState("")
  const [ passwordNotValid, setPasswordNotValid ] = useState(false)

  // TODO: Get an email regex that actually works
  // TODO: From https://emailregex.com/ - IE Not from these guys
  const emailRegexOLDANDBUESTED = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  // TODO: Make sure username and domain name don't allow multiple consecutive dashes, underscores or periods
  const emailRegex = /^[a-zA-Z0-9\-._]*@[a-zA-Z0-9\-.]*.[.com|.org|.net|.int|.edu|.gov|.mil]$/

  const handleEmail = (e) => {
    setEmail(e.target.value)
    if (emailRegex.test(e.target.value) === true) {
      setEmailNotValid(false)
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length > 3) {
      setPasswordNotValid(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Email
    if (emailRegex.test(email) === false) {
      // Set form error styles
      setEmailNotValid(true)
    }
    else {
      setEmailNotValid(false)
    }
    // Password
    if (password.length < 4) {
      // Set form error styles
      setPasswordNotValid(true)
    }
    else {
      setPasswordNotValid(false)
    }
    if (email.length > 5 && password.length >= 4) {
      // Check login, axios
      console.log("hunky dory")
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="floating_email"
            value={email}
            onChange={handleEmail}
            type="text"
            name="floating_email"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${emailNotValid ? "border-rose-400 dark:border-rose-400" : "border-gray-300 dark:border-gray-600" } appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className={`peer-focus:font-medium absolute text-sm ${emailNotValid ? "text-rose-400 dark:text-rose-400" : "text-gray-500 dark:text-gray-400" } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Email address
          </label>
          {emailNotValid && <p className="mt-2 text-sm text-rose-500 dark:text-rose-400"><span className="font-medium">Oops!</span> Please enter an email.</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="floating_password"
            value={password}
            onChange={handlePassword}
            type="password"
            name="floating_password"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${passwordNotValid ? "border-rose-400 dark:border-rose-400" : "border-gray-300 dark:border-gray-600" } appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className={`peer-focus:font-medium absolute text-sm ${passwordNotValid ? "text-rose-400 dark:text-rose-400" : "text-gray-500 dark:text-gray-400" } text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
              Password
          </label>
          {passwordNotValid && <p className="mt-2 text-sm text-rose-500 dark:text-rose-400"><span className="font-medium">Oops!</span> Please enter a password of at least 4 characters.</p>}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login
