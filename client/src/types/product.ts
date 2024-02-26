export type Category = {
  id: string,
  title: string,
  pictureUrl: string,
  type: string
}

export interface Product {
  id: string,
  title: string,
  productType: "Computer" |
  "Phone" |
  "TV" |
  "Games" |
  "Tablets" |
  "Office" |
  "Kitchen",
  availability: number,
  brand: string,
  price: number,
  discount: number,
  color: Array<string>,
  picture: string,
  description: string,
  height?: number,           //By mm
  width?: number,            //By mm
  weight?: number,           //By grams
  depth?: number,            //By mm
  batteryCharacteristics?: string,
  screenSize?: number,       //By inches
  screenResolution?: string,
  compatibility?: string,    //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
  innerMemory: Array<number>,      //By GB 
  ramMemory?: number,        //By GB
  warrantyLength?: number,   //by months
  otherFeature?: string,
  eanCode: string,
  manufacturerProductCode: string,
}

export type ProductTypeProps = {
  all: Array<Product>,
  byId: Product,
  loading: "idle" | "pending"
}