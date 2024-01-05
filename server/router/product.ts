import { Router } from "express"
import { verifyAdmin } from "../helper/utils"
import Product from "../schema/product"

const productRouter = Router()

productRouter.get("/", async (req, res) => {
  const category = req.query.category
  const isDiscount = req.query.discount
  const products = await Product.find()
  if (isDiscount || category) {
    return res.json(
      products.filter(
        (productData) =>
          productData.productType === category || !!productData.discount
      )
    )
  }
  res.json(products)
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
  verifyAdmin(req, res)
  const newProduct = new Product({ ...body, discount: body.discount || 0 })
  await newProduct.save()
  res.status(201).json(newProduct.toJSON())
})

productRouter.put("/:id", async (req, res) => {
  const { body } = req
  verifyAdmin(req, res)
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, body, {
    new: true,
  })
  res.status(200).json(updatedProduct)
})

productRouter.delete("/:id", async (req, res) => {
  verifyAdmin(req, res)
  await Product.findByIdAndDelete(req.params.id)
  res.status(204).send(`Deleted product ${req.params.id} successfully!`).end()
})

export default productRouter
