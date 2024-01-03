import Product from "../schema/product"
import { Router } from "express"

const router = Router()

router.get("/", async (_req, res) => {
  const products = await Product.find({})
  return res.json(products)
})

router.get("/:category", async (req, res) => {
  const products = await Product.find({ productType: req.params.category })
  if (products) {
    return res.json(products)
  } else {
    res.status(404).end()
  }
})

router.get("/:id", async (req, res) => {
  const selectedProduct = await Product.findById(req.params.id)
  if (selectedProduct) {
    return res.json(selectedProduct)
  } else {
    res.status(404).end()
  }
})