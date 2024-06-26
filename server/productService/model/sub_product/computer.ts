import { Schema, model } from "mongoose";

import productSchema from "../product";

const computerProductSchema = new Schema({
  price: { type: Number, required: true },
  deviceType: {
    type: [String],
    enum: ["Desktop", "Laptop", "CPU", "Office", "Gaming", "Accessories"],
    required: true
  },
  screenSize: Number, //By inches
  screenResolution: String,
  power: { type: Number, required: true }, //By Watts
  compatibility: { type: String, required: true }, //Available connectors: USB Type C, HDMI, etc.
  innerMemory: { type: [Number], required: true }, //By GB
  ramMemory: { type: Number, required: true }, //By GB
  batteryCharacteristics: String,
  operatingSystem: { type: String, required: true },
  camera: Number, //by MP
  videoCard: String,
  soundReproduction: String,
  processor: { type: String, required: true },
  refreshRate: Number, //by Hz
  supportedNetwork: { type: String, required: true }, //Available network info: e.g., Bluetooth, Wifi, 4G-5G.
})

productSchema.discriminator("Computer", computerProductSchema)
export default model("Computer")