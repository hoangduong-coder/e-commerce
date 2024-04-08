import { Schema, model } from "mongoose"

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
          item: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          selectedInnerMemory: Number,
          selectedColor: {
            colorCode: String,
            colorName: String
          },
          selectedPaymentDuration: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    //discountCode: String,
    deliveryType: {
      type: String,
      enum: ["None", "Normal", "Fast"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Progress", "Delivered", "Cancelled", "Received"],
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
