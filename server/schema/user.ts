import { Schema, model } from "mongoose"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      unique: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: String,
    orderHistory: [{
      type: Schema.Types.ObjectId,
      ref: "Order"
    }],
    avatar: String,
    role: {
      type: String,
      enum: ["Admin", "Visitor"],
      required: true
    }
  },
  { timestamps: true }
)

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    ; (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model("User", userSchema)
