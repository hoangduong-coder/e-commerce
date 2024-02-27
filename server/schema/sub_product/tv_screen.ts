import { Schema, model } from "mongoose";

import product from "../product";

const screenAndTVProductSchema = new Schema({

})

product.discriminator("TVScreen", screenAndTVProductSchema)
export default model("TVScreen")