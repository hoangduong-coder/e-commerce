import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: `${path.resolve(__dirname, "./src/api/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      reduxStore: `${path.resolve(__dirname, "./src/reduxStore/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`
    }
  },
  // server: {
  //   proxy: {
  //     '/api': "http://localhost:3000"
  //   }
  // }
})
