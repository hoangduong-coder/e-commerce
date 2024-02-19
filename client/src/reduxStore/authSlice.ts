import { createSlice } from "@reduxjs/toolkit"
import { AuthSliceProps } from "types/auth"

const initialState: AuthSliceProps = {
  loading: false,
  userInfo: {
    name: "",
    email: "",
    passwordHash: "",
    postalCode: "",
    city: "",
    phone: "",
    role: "Visitor"
  },
  error: null,
  success: false
}

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {}
})

export default authSlice.reducer