import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authLogin } from "./auth/authSlice"

const Login = () => {
  const [ email, setEmail ] = useState("")
  const [ emailNotValid, setEmailNotValid ] = useState(false)
  const [ password, setPassword ] = useState("")
  const [ passwordNotValid, setPasswordNotValid ] = useState(false)
  
  // TODO: Add error state handling in form
  
  const { loading, success } = useSelector((state) => ({
    loading: state.auth.loading,
    success: state.auth.success
  }))

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    // On successful login redirect to dashbaord
    if (success) {
      navigate("/dashboard")
    }
  }, [success])

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
    // TODO: Update username/email validation
    // Email logic
    if (email.length < 4) {
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
    if (email.length > 3 && password.length >= 4) {
      // Dispatch login action
      dispatch(authLogin({ username: email, password }))
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
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign In
        </button>
        {error && <div id="alert-2" class="flex items-center p-4 mb-4 text-rose-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-rose-400" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">{error}</div>
  <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-rose-500 rounded-lg focus:ring-2 focus:ring-rose-400 p-1.5 hover:bg-rose-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-rose-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
}
      </form>
    </div>
  )
}

export default Login
