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

  res.status(201).json(orderList)
})

orderRouter.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  const orderList: any[] = []
  let totalPrice: number = 0

  for (const orderItem of req.body.orders) {
    const selectedProduct = await Product.findById(orderItem.productID)
    if (selectedProduct !== null) {
      const deviceMemory = selectedProduct.innerMemory.find(productMemo => productMemo === orderItem.selectedProductMemo)
      orderList.push({
        orderedProduct: selectedProduct._id,
        quantity: orderItem.quantity,
        selectedInnerMemory: deviceMemory ?? selectedProduct.innerMemory.at(-1)
      })

      if (selectedProduct.discount) {
        totalPrice += selectedProduct.price * (1 - selectedProduct.discount)
      } else {
        totalPrice += selectedProduct.price
      }
    }
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
    orders: [...orderList],
    deliveryType: req.body.deliveryType,
    price: totalPrice,
    status: "Progress",
  })

  const savedOrder = await order.save()
  res.status(201).json(savedOrder)
})

orderRouter.put("/:id", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updatedOrder)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

orderRouter.delete("/:id", async (req, res) => {
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
    res.status(204).send(`Deleted product ${req.params.id} successfully!`).end()
  } else {
    res.status(401).json({ error: "No user found" }).end()
  }
})

export default orderRouter
