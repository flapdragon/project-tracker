import { combineSlices } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"

const rootReducer = combineSlices({
  auth: authSlice
})

export default rootReducer