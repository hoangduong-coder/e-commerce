import { Schema, model } from "mongoose"

import product from "../product"

const phoneProductSchema = new Schema({
  color: { type: [String], required: true },
  screenSize: { type: Number, required: true }, //By inches
  screenResolution: { type: String, required: true },
  compatibility: { type: String, required: true }, //Available connectors: USB Type C, HDMI, etc.
  innerMemory: { type: [Number], required: true }, //By GB
  ramMemory: { type: Number, required: true }, //By GB
  batteryCharacteristics: { type: String, required: true },
  operatingSystem: { type: String, required: true },
  camera: { type: Number, required: true }, //by MP
  frontCamera: { type: Number, required: true }, //by MP
  resistanceAbility: {
    type: [String],
    enum: ["dust", "water", "impact"],
  },
  numberOfCameras: {
    type: Number,
    required: true,
  },
  processor: { type: String, required: true },
  refreshRate: {
    type: Number,
    required: true,
  }, //by Hz
  supportedNetwork: { type: String, required: true }, //Available network info: e.g., Bluetooth, Wifi, 4G-5G.
  otherFeature: String,
})

product.discriminator("Phone", phoneProductSchema)

export default model("Phone")
