import { Request, Response, Router } from "express"

import { verifyAdmin } from "../helper/utils"
import Product from "../schema/product"

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
        discount?: boolean
      }
    >,
    res: Response
  ) => {
    const category = req.query.category
    const isDiscount = req.query.discount
    const products = await Product.find()
    if (isDiscount || category) {
      return res.json(
        products.filter(
          (productData) =>
            // @ts-ignore
            productData.productType.includes(category) || !!productData.discount
        )
      )
    }
    res.json(products)
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

productRouter.post("/", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    const newProduct = new Product({
      ...req.body,
      discount: req.body.discount || 0,
    })
    await newProduct.save()
    res.status(201).json(newProduct.toJSON())
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

productRouter.put("/:id", async (req, res) => {
  try {
    await verifyAdmin(req, res)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updatedProduct)
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
