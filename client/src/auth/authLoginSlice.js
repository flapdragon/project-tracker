import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: false,
  userInfo: {},
  authToken: null,
  error: null,
  success: false
}

export const authLogin = createAsyncThunk('auth/login', async (credentials) => {
  const { username, password } = credentials
  console.log("authLogin", username, password)
  const response = await axios.post(`${process.env.REACT_APP_SERVER}/users/login`, { username, password }, { headers: { 'Content-Type': 'application/json' }})
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    console.log(builder)
    builder
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log(state, action)
        // Set state the gross way
        state.loading = false
        state.success = true
        state.authToken = action.payload.token
        // Set token in local storage
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})

export default authSlice.reducer