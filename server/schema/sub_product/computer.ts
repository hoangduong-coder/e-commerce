import { Schema, model } from "mongoose";

import product from "../product";

const computerProductSchema = new Schema({
  computerType: {
    type: String,
    enum: ["Desktop", "Laptop", "CPU"],
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
  otherFeature: String,
})

product.discriminator("Computer", computerProductSchema)
export default model("Computer")