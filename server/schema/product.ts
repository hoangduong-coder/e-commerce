import { Schema, model } from "mongoose";

const productSchema = new Schema({
  model: { type: String, required: true },
  title: { type: String, required: true },
  productType: {
    type: String,
    enum: ["Computer", "Phone", "TV", "Games", "Tablets", "Office", "Kitchen"],
    required: true
  },
  availability: {
    type: Number,
    required: true
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: [String], required: true },
  picture: { type: String, required: true },
  description: {
    type: String, required: true
  },
  height: Number,
  weight: Number,
  depth: Number,
  batteryCharacteristics: String,
  screenSize: Number,
  screenResolution: String,
  //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
  compatibility: String,
  //RAM memory
  innerMemory: Number,
  ramMemory: Number,
  //by months
  warrantyLength: Number
}, { timestamps: true })

productSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model("Product", productSchema)