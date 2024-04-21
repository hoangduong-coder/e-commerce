import { handleError, unknownEndpoint } from "./helper/middleware"
import { MONGO_URL, PORT } from "./helper/utils"

import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import productRouter from "./controller"
import { createChannel } from "./rabbitmq"

const app = express()

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log(`Error in connecting MongoDB ${error}`))

createChannel()

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use("/api/products", productRouter)

app.use(unknownEndpoint)
app.use(handleError)

app.listen(PORT, () => {
  console.log("New e-commerce product microservice is ready")
})