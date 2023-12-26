import "./index.css"

import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

const theme = createTheme({
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
