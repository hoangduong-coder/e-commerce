import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET_KEY, verifyAdmin } from "../helper/utils"

import { Router } from "express"
import Order from "../schema/order"
import Product from "../schema/product"
import User from "../schema/user"

const orderRouter = Router()

orderRouter.get("/", async (req, res) => {
  const authorizedToken = req.headers["authorization"]
  const decodedToken = authorizedToken
    ? (jwt.verify(authorizedToken, SECRET_KEY) as JwtPayload)
    : null
  if (!decodedToken || decodedToken === null || !decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" })
  }

  const orderList = await Order.findOne({ user: decodedToken.id }).populate([
    "user",
    {
      path: "orders",
      populate: { path: "orderedProduct" },
    },
  ])

  res.status(201).json(orderList)
})

orderRouter.post("/", async (req, res) => {
  const { body } = req.body
  let user = await User.findOne({ email: body.email })
  const orderList: any[] = []
  let totalPrice: number = 0

  body.orders.forEach(async (orderItem) => {
    const selectedProduct = await Product.findById(orderItem.product.id)
    if (selectedProduct !== null) {
      orderList.push({
        orderedProduct: selectedProduct.id,
        quantity: orderItem.quantity,
      })
      if (selectedProduct.discount) {
        totalPrice += selectedProduct.price * (1 - selectedProduct.discount)
      } else {
        totalPrice += selectedProduct.price
      }
    }
  })

  if (!user) {
    const newUser = new User({
      name: body.name,
      email: body.email,
      streetAddress: body.streetAddress,
      postalCode: body.postalCode,
      city: body.city,
      phone: body.phone,
      role: "Visitor",
    })
    user = await newUser.save()
  }

  const order = new Order({
    user: user,
    orders: orderList,
    discountCode: body.discountCode,
    deliveryType: body.deliveryType,
    price: totalPrice,
    status: "Progress",
  })

  const savedOrder = await order.save()
  user.orderHistory = user.orderHistory.concat(savedOrder._id)
  await user.save()
  res.status(201).json(savedOrder)
})

orderRouter.put("/:id", async (req, res) => {
  const { body } = req.body
  verifyAdmin(req, res)
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, body, {
    new: true,
  })
  res.status(200).json(updatedOrder)
})

orderRouter.delete("/:id", async (req, res) => {
  const authorizedToken = req.headers["authorization"]
  const decodedToken = authorizedToken
    ? (jwt.verify(authorizedToken, SECRET_KEY) as JwtPayload)
    : null
  if (!decodedToken || decodedToken === null || !decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" })
  }

  const user = await User.findById(decodedToken.id)

  if (user) {
    await Order.findByIdAndDelete(req.params.id)
    const newUserOrderHistory = user.orderHistory.filter(
      (orderData) => orderData._id.toString() !== req.params.id
    )
    user.orderHistory = newUserOrderHistory
    res.status(204).send(`Deleted product ${req.params.id} successfully!`).end()
  } else {
    res.status(401).json({ error: "No user found" }).end()
  }
})

export default orderRouter
