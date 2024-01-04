import * as dotenv from "dotenv"

import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import productRouter from "./router/product"

const app = express()
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log(`Error in connecting MongoDB ${error}`))

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use('/api/products', productRouter)

app.listen(process.env.PORT, () => {
  console.log("Welcome to my new e-commerce")
})
