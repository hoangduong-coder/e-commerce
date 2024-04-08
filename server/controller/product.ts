import * as amqp from "amqplib"

import { Request, Response, Router } from "express"
import { RABBITMQURI, verifyAdmin } from "../helper/utils"

import Product from "../model/product"
import Computer from "../model/sub_product/computer"
import Games from "../model/sub_product/games"
import Phone from "../model/sub_product/phone"
import TVScreen from "../model/sub_product/tv_screen"
import { OrderedProduct } from "../types/order"

const productRouter = Router()
let connection: amqp.Connection
let channel: amqp.Channel

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(RABBITMQURI)
    channel = await connection.createChannel()
    await channel.assertQueue("ORDER")
  } catch (err) {
    console.log("Error in establish product RabbitMQ", err)
  }
}

connectRabbitMQ().then(() => {
  channel.consume("ORDER", async (data: any) => {
    const newOrders: OrderedProduct[] = JSON.parse(data.content)
    try {
      for (const cartItem of newOrders) {
        const { item, quantity } = cartItem
        const product = await Product.findById(item._id)

        if (!product) {
          throw new Error(`No product stock found for item ${item._id}!!`)
        }

        const remainingStock = product.availability - quantity
        if (remainingStock < 0) {
          throw new Error(`The number of items ${item._id} in stock is insufficient with your quantity`)
        }
      }
      channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ status: "Accepted" })))

      for (const cartItem of newOrders) {
        const { item, quantity } = cartItem
        const product = await Product.findById(item._id)
        if (product) {
          product.availability -= quantity
          product.save()
        }
      }
    } catch (error) {
      console.log("Error in connecting product RabbitMQ: ", error)
      channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ status: "Rejected", error, newOrders })))
    }
  })
})

productRouter.get(
  "/",
  async (
    req: Request<
      {},
      {},
      {},
      {
        category?: string
      }
    >,
    res: Response
  ) => {
    const category = req.query.category
    if (category) {
      const products = await Product.find({ category: category })
      return res.json(products)
    } else {
      const products = await Product.find()
      res.json(products)
    }
  }
)

productRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const selectedProduct = await Product.findById(req.params.id)
    if (selectedProduct) {
      return res.json(selectedProduct)
    } else {
      return res.status(404).end()
    }
  }
)

productRouter.post(
  "/:category",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      await verifyAdmin(req, res)
      const newProduct = new Product({
        ...req.body,
        category: req.params.category,
      })
      await newProduct.save()
      return res.status(201).json(newProduct.toJSON())
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
)

productRouter.put(
  "/:category/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      await verifyAdmin(req, res)
      let updatedProduct = null
      switch (req.params.category) {
        case "phone":
          updatedProduct = await Phone.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              overwriteDiscriminatorKey: true,
              new: true,
            }
          )
          break
        case "computer":
          updatedProduct = await Computer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              overwriteDiscriminatorKey: true,
              new: true,
            }
          )
          break
        case "gaming":
          updatedProduct = await Games.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              overwriteDiscriminatorKey: true,
              new: true,
            }
          )
          break
        case "tv":
          updatedProduct = await TVScreen.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              overwriteDiscriminatorKey: true,
              new: true,
            }
          )
          break
      }
      if (updatedProduct === null) {
        return res.status(200).send("No update products")
      }
      return res.status(200).json(updatedProduct)
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
)

productRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      await verifyAdmin(req, res)
      await Product.findByIdAndDelete(req.params.id)
      return res
        .status(204)
        .send(`Deleted product ${req.params.id} successfully!`)
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
)

export default productRouter
