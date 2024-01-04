import { Router } from "express"
import Product from "../schema/product"

const productRouter = Router()

productRouter.get("/", async (req, res) => {
  const category = req.query.category
  const isDiscount = req.query.discount
  const products = await Product.find()
  if (isDiscount || category) {
    return res.json(products.filter(productData => productData.productType === category || !!productData.discount))
  }
  return res.json(products)
})

productRouter.get("/:id", async (req, res) => {
  const selectedProduct = await Product.findById(req.params.id)
  if (selectedProduct) {
    return res.json(selectedProduct)
  } else {
    res.status(404).end()
  }
})

productRouter.post("/", async (req, res) => {
  const { body } = req
  const newProduct = new Product({ ...body, discount: body.discount || 0 })
  await newProduct.save()
  res.status(201).json(newProduct.toJSON())
})

export default productRouter