import * as dotenv from "dotenv"

import express from "express"
import mongoose from "mongoose"

const app = express()
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log(`Error in connecting MongoDB ${error}`))

app.listen(process.env.PORT, () => {
  console.log("Welcome to my new e-commerce")
})
