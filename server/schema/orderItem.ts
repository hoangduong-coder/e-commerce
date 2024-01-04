import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  orderedProduct: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true })

orderItemSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model("OrderItem", orderItemSchema)