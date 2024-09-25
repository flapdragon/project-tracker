import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

const initialState = {
  loading: false,
  userInfo: {},
  authToken: null,
  error: null,
  success: false,
  isLoggedIn: false
}

// TODO: move axios http logic to separate service file

export const authLogin = createAsyncThunk("auth/login", async (credentials) => {
  const { username, password } = credentials
  const response = await authService.authLogin(username, password)
  return response.data
})

export const authSignup = createAsyncThunk("auth/signup", async (data) => {
  const { firstName, lastName, username, email, password } = data
  const response = await authService.authSignup(firstName, lastName, username, email, password)
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Login builder
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log(state, action)
        // Set state the gross way
        state.loading = false
        state.success = true
        state.isLoggedIn = true
        state.authToken = action.payload.token
        state.error = ""
        // Set token in local storage
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.isLoggedIn = false
        state.authToken = {}
        state.error = action.error.message ?? "Unknown Error"
      })

      // Signup builder
      .addCase(authSignup.pending, (state, action) => {
        state.loading = true
      })
      .addCase(authSignup.fulfilled, (state, action) => {
        console.log(state, action)
        // Set state the gross way
        state.loading = false
        state.success = true
        state.isLoggedIn = true
        state.authToken = action.payload.token
        // Set token in local storage
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(authSignup.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.isLoggedIn = false
        state.authToken = {}
        state.error = action.error.message ?? "Unknown Error"
      })
  }
})

export default authSlice.reducer