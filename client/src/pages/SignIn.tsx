import "./pages.scss"

import { Button, Typography } from "@mui/material"

import { Google } from "@mui/icons-material"
import SignInForm from "components/auth/SignInForm"

const SignIn = () => {
  return (
    <div className="login-box">
      <Typography variant="h4">Sign in</Typography>
      <SignInForm />
      <div className="login-box-alternatives">
        <p className="login-box-alternatives-text">Or sign in with</p>
        <Button variant="outlined" startIcon={<Google />}>
          Google
        </Button>
      </div>
      <div className="login-box-alternatives">
        <p className="login-box-alternatives-text">Doesn't have account?</p>
        <Button>Sign up here</Button>
      </div>
    </div>
  )
}

export default SignIn
