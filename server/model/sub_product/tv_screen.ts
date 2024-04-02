import { Schema, model } from "mongoose";

import product from "../product";

const screenAndTVProductSchema = new Schema({
  price: { type: Number, required: true }
})

product.discriminator("TVScreen", screenAndTVProductSchema)
export default model("TVScreen")