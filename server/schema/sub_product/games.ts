import { Schema, model } from "mongoose";

import product from "../product";

const gamesProductSchema = new Schema({
  price: { type: Number, required: true }
})

product.discriminator("Gaming", gamesProductSchema)
export default model("Gaming")