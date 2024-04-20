import { Schema, model } from "mongoose";

import productSchema from "../product";

const gamesProductSchema = new Schema({
  price: { type: Number, required: true }
})

productSchema.discriminator("Gaming", gamesProductSchema)
export default model("Gaming")