import { Schema, model } from "mongoose";

import product from "../product";

const gamesProductSchema = new Schema({

})

product.discriminator("Games", gamesProductSchema)
export default model("Games")