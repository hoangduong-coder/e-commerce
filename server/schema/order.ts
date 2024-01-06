import { Schema, model } from "mongoose"

const DeliveryType = {
  type: String,
  enum: ["Normal", "Fast"],
}

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orders: {
      type: [
        {
          orderedProduct: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    discountCode: String,
    deliveryType: {
      type: DeliveryType,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Progress", "Pending", "Cancelled", "Received"],
      required: true,
    },
  },
  { timestamps: true }
)

orderSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model("Order", orderSchema)
