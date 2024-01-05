import { handleError, unknownEndpoint } from "./helper/middleware"
import { MONGO_URL, PORT } from "./helper/utils"

import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import loginRouter from "./router/auth"
import productRouter from "./router/product"
import userRouter from "./router/user"

const app = express()

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log(`Error in connecting MongoDB ${error}`))

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', loginRouter)

app.use(unknownEndpoint)
app.use(handleError)

app.listen(PORT, () => {
  console.log("Welcome to my new e-commerce")
})
