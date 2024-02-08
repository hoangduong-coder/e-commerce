import { Schema, model } from "mongoose"

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    productType: {
      type: [String],
      enum: [
        "Computer",
        "Phone",
        "TV",
        "Games",
        "Tablets",
        "Office",
        "Kitchen",
      ],
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: Number,
    color: { type: [String], required: true },
    picture: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    height: Number,           //By mm
    width: Number,            //By mm
    weight: Number,           //By grams
    depth: Number,            //By mm
    batteryCharacteristics: String,
    screenSize: Number,       //By inches
    screenResolution: String,
    compatibility: String,    //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
    innerMemory: [Number],      //By GB 
    ramMemory: Number,        //By GB
    warrantyLength: Number,   //by months
    otherFeature: String,
    eanCode: {
      type: String,
      required: true,
    },
    manufacturerProductCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model("Product", productSchema)
