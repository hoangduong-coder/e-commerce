import { Schema, model } from "mongoose";

import OrderItem from "./orderItem";

const DeliveryType = {
  type: String,
  enum: ["Normal", "Fast"],
}

const orderSchema = new Schema({
  user: String,
  orders: {
    type: [OrderItem],
    required: true
  },
  discountCode: String,
  deliveryStatus: {
    type: {
      deliveryType: DeliveryType,
      postalAddress: String
    },
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Progress", "Pending", "Cancelled", "Received"],
    required: true
  }
}, { timestamps: true })

orderSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model("Order", orderSchema)