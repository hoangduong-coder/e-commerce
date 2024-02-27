import { Schema, model } from "mongoose";

import product from "../product";

const gamesProductSchema = new Schema({

})

product.discriminator("Gaming", gamesProductSchema)
export default model("Gaming")