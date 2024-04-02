import { Request, Response, Router } from "express"

import { verifyAdmin } from "../helper/utils"
import Product from "../model/product"
import Computer from "../model/sub_product/computer"
import Games from "../model/sub_product/games"
import Phone from "../model/sub_product/phone"
import TVScreen from "../model/sub_product/tv_screen"

const productRouter = Router()

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
      const products = await Product.find({ "category": category })
      return res.json(products)
    } else {
      const products = await Product.find()
      res.json(products)
    }
  }
)

productRouter.get("/:id", async (req, res) => {
  const selectedProduct = await Product.findById(req.params.id)
  if (selectedProduct) {
    return res.json(selectedProduct)
  } else {
    res.status(404).end()
  }
})

productRouter.post("/:category", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    const newProduct = new Product({
      ...req.body,
      category: req.params.category,
    })
    await newProduct.save()
    res.status(201).json(newProduct.toJSON())
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

productRouter.put("/:category/:id", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    let updatedProduct = null
    switch (req.params.category) {
      case "phone":
        updatedProduct = await Phone.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            overwriteDiscriminatorKey: true, new: true,
          }
        )
        break
      case "computer":
        updatedProduct = await Computer.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            overwriteDiscriminatorKey: true, new: true,
          }
        )
        break
      case "gaming":
        updatedProduct = await Games.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            overwriteDiscriminatorKey: true, new: true,
          }
        )
        break
      case "tv":
        updatedProduct = await TVScreen.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            overwriteDiscriminatorKey: true, new: true,
          }
        )
        break
    }
    if (updatedProduct !== null) {
      res.status(200).json(updatedProduct)
    }
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

productRouter.delete("/:id", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    await Product.findByIdAndDelete(req.params.id)
    res.status(204).send(`Deleted product ${req.params.id} successfully!`)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

export default productRouter
