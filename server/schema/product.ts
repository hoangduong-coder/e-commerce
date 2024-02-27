import { Schema, model } from "mongoose"

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    productType: {
      type: [String],
      enum: [
        "Computer",
        "Phone",
        "TV",
        "Games"
      ],
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: Number,
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
  },
  { timestamps: true }
)

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model("Product", productSchema)
