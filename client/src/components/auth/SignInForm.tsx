import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
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

  const submitForm = () => {
    console.log(email, password)
  }

  const reset = () => {
    setEmail("")
    setPassword("")
    setShowPassword(false)
  }

  return (
    <form>
      <TextField
        margin="normal"
        label="Email"
        fullWidth
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
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
      <Stack direction="row" spacing={2} marginBlock={2}>
        <Button
          onClick={submitForm}
          fullWidth
          variant="contained"
          disabled={email.length === 0 || password.length === 0}
        >
          Sign in
        </Button>
        <Button onClick={reset} fullWidth variant="outlined">
          Reset
        </Button>
      </Stack>
    </form>
  )
}

export default SignInForm
