import * as amqp from "amqplib"

import { Request, Response, Router } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { RABBITMQURI, SECRET_KEY, verifyAdmin } from "../helper/utils"
import { AMQPOrderMessage, OrderedProduct } from "../types/order"

import Order from "../model/order"
import User from "../model/user"

const orderRouter = Router()
let connection, channel

orderRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  const authorizedToken = req.headers["authorization"]
  const decodedToken = authorizedToken
    ? (jwt.verify(authorizedToken, SECRET_KEY) as JwtPayload)
    : null
  if (!decodedToken?.id) {
    return res.status(401).json({ error: "Token invalid" })
  }

  const orderList = await Order.findOne({ user: decodedToken.id }).populate([
    "user",
    {
      path: "orders",
      populate: { path: "orderedProduct" },
    },
  ])

  return res.status(201).json(orderList)
})

orderRouter.post(
  "/buy",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      connection = await amqp.connect(RABBITMQURI)
      channel = await connection.createChannel()

      const body: OrderedProduct = req.body.cart
      let channelConsumeResponse: AMQPOrderMessage

      const exchangeName = "ORDER"
      await channel.assertExchange(exchangeName, "fanout", { durable: false })
      channel.publish(exchangeName, "", Buffer.from(JSON.stringify(body)))

      channel.consume("PRODUCT", (data: any) => {
        channelConsumeResponse = JSON.parse(data.content)
        if (channelConsumeResponse.status === "Rejected") {
          throw new Error((channelConsumeResponse.error as Error).message)
        }
      })

      return res.status(201).send("Can proceed to pay")
    } catch (e) {
      return res.status(500).json(e)
    }
  }
)

orderRouter.post(
  "/pay",
  async (req: Request, res: Response): Promise<Response> => {
    let user = await User.findOne({ email: req.body.email })
    let totalPrice: number = 0
    const cart: OrderedProduct[] = req.body.cart

    for (const cartItem of cart) {
      totalPrice += cartItem.price * cartItem.quantity
    }

    switch (req.body.deliveryType) {
      case "Normal": {
        totalPrice += 4.9
        break
      }
      case "Fast": {
        totalPrice += 11.9
        break
      }
      default:
        break
    }

    if (!user) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        streetAddress: req.body.streetAddress,
        postalCode: req.body.postalCode,
        city: req.body.city,
        phone: req.body.phone,
        role: "Visitor",
      })
      user = await newUser.save()
    }

    const order = new Order({
      user: user,
      orders: [...cart],
      deliveryType: req.body.deliveryType,
      price: totalPrice,
      status: "Progress",
    })

    const savedOrder = await order.save()
    return res.status(201).json(savedOrder)
  }
)

orderRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      await verifyAdmin(req, res)
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      return res.status(200).json(updatedOrder)
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
)

orderRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const authorizedToken = req.headers["authorization"]
    const decodedToken = authorizedToken
      ? (jwt.verify(authorizedToken.slice(7), SECRET_KEY) as JwtPayload)
      : null
    if (!decodedToken?.id) {
      return res.status(401).json({ error: "Token invalid" })
    }

    const user = await User.findById(decodedToken.id)
    const order = await Order.findById(req.params.id)
    if (
      user?._id.toString() === order?.user._id.toString() ||
      user?.role === "Admin"
    ) {
      await Order.deleteOne({ _id: order?._id })
      return res
        .status(204)
        .send(`Deleted product ${req.params.id} successfully!`)
        .end()
    } else {
      return res.status(401).json({ error: "No user found" }).end()
    }
  }
)

export default orderRouter
