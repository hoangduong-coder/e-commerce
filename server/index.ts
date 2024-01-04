import * as dotenv from "dotenv"

import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import loginRouter from "./router/auth"
import productRouter from "./router/product"
import userRouter from "./router/user"

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
app.use('/api/users', userRouter)
app.use('/api/auth', loginRouter)


app.listen(process.env.PORT, () => {
  console.log("Welcome to my new e-commerce")
})
