import "./index.css"

import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "reduxStore/store.ts"
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
