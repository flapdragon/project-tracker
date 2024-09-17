import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// TODO: Figure out why we can't name the createAsyncThunk auth/signup

const initialState = {
  loading: false,
  userInfo: {},
  authToken: null,
  error: null,
  success: false
}

export const authSignup = createAsyncThunk('auth/login', async (data) => {
  const { firstName, lastName, username, email, password } = data
  console.log("authSignup", username, password)
  const response = await axios.post(`${process.env.REACT_APP_SERVER}/users/signup`, { firstName, lastName, username, email, password }, { headers: { 'Content-Type': 'application/json' }})
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    console.log(builder)
    builder
      .addCase(authSignup.pending, (state, action) => {
        state.loading = true
      })
      .addCase(authSignup.fulfilled, (state, action) => {
        console.log(state, action)
        // Set state the gross way
        state.loading = false
        state.success = true
        state.authToken = action.payload.token
        // Set token in local storage
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(authSignup.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})

export default authSlice.reducer