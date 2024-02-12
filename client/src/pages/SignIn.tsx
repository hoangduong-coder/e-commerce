import { Google, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { ChangeEvent, useState } from "react"

import { MouseEvent } from "react"

const SignInForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword((currentStatus) => !currentStatus)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const submitForm = () => {}

  return (
    <form>
      <TextField
        margin="normal"
        label="email"
        fullWidth
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}
      />
      <FormControl variant="outlined">
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
        />
      </FormControl>
      <div>
        <Button onClick={submitForm}>Sign in</Button>
        <Button onClick={submitForm}>Reset</Button>
      </div>
      <Button>
        <Google />
        Sign in with Google
      </Button>
    </form>
  )
}

export default SignInForm
