import { User } from "./main"

export type SignInProps = {
  email: string
  password: string
}

export type SignUpProps = {
  name: string
  email: string
  password: string
  streetAddress: string
  postalCode: string
  city: string
  phone: string
}

export type AuthSliceProps = {
  loading: boolean,
  userInfo: User,
  error: string | null,
  success: false
}