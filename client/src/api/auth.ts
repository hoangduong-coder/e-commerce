import { SignInProps, SignUpProps } from "types/auth"
import { loginApi, userApi } from "../utils"

import axios from "axios"

export const handleSignIn = async (credentials: SignInProps) => {
  const response = await axios.post(loginApi, credentials)
  return response.data
}

export const handleSignUp = async (credentials: SignUpProps) => {
  const response = await axios.post(userApi, credentials)
  return response.data
}

export const tokenHeader = (token: string) => ({
  headers: { Authorization: token }
})