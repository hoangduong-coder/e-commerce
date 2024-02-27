import { Schema, model } from "mongoose"

import { Product } from "../types/products"

const productSchema = new Schema<Product>(
  {
    title: { type: String, required: true },
    availability: {
      type: Number,
      required: true,
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    height: Number,           //By mm
    width: Number,            //By mm
    weight: Number,           //By grams
    depth: Number,            //By mm
    warrantyLength: { type: Number, required: true }, //by months
    eanCode: {
      type: String,
      required: true,
    },
    manufacturerProductCode: {
      type: String,
      required: true,
    },
    otherFeatures: String,
  },
  { timestamps: true, discriminatorKey: "category" }
)

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model("Product", productSchema)
