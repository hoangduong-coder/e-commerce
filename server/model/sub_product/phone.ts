import { Schema, model } from "mongoose"

import product from "../product"

const phoneProductSchema = new Schema({
  deviceType: {
    type: [String],
    enum: ["Accessories", "Gaming"],
  },
  price: { type: [Number], required: true },
  color: {
    type: [
      {
        colorCode: { type: String, required: true },
        colorName: { type: String, required: true },
      },
    ],
    required: true,
  },
  screenSize: { type: Number, required: true }, //By inches
  screenResolution: { type: String, required: true },
  compatibility: { type: String, required: true }, //Available connectors: USB Type C, HDMI, etc.
  innerMemory: { type: [Number], required: true }, //By GB
  ramMemory: Number, //By GB
  batteryCharacteristics: { type: String, required: true },
  operatingSystem: { type: String, required: true },
  camera: { type: String, required: true }, //by MP
  frontCamera: String, //by MP
  resistanceAbility: {
    type: [String],
    enum: ["dust", "water", "impact", "splash"],
  },
  numberOfCameras: {
    type: Number,
    required: true,
  },
  processor: String,
  refreshRate: Number, //by Hz
  supportedNetwork: { type: String, required: true }, //Available network info: e.g., Bluetooth, Wifi, 4G-5G.
})

product.discriminator("Phone", phoneProductSchema)

export default model("Phone")
