import { Schema, model } from "mongoose";

import productSchema from "../product";

const screenAndTVProductSchema = new Schema({
  price: { type: Number, required: true }
})

productSchema.discriminator("TVScreen", screenAndTVProductSchema)
export default model("TVScreen")