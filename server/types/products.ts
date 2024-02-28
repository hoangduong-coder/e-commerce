export interface Product {
  id: string
  title: string
  category: "Computer" | "Phone" | "TVScreen" | "Gaming"
  availability: number
  brand: string
  price: number | Array<number>
  picture: string
  description: string
  height?: number //By mm
  width?: number //By mm
  weight?: number //By grams
  depth?: number //By mm
  warrantyLength?: number //by months
  otherFeatures?: string
  eanCode: string
  manufacturerProductCode: string
  updatedAt: string
  createdAt: string
}

export interface PhoneProduct extends Product {
  deviceType: Array<"Gaming" | "Accessories">
  batteryCharacteristics: string,
  screenSize: number,       //By inches
  screenResolution: string,
  compatibility: string,    //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
  innerMemory: Array<number>,      //By GB 
  ramMemory?: number,
  color: Array<string>,
  operatingSystem: string,
  camera: string, //by MP
  frontCamera?: number, //by MP
  resistanceAbility: "dust" | "water" | "impact" | "splash",
  numberOfCameras: number,
  processor?: string,
  refreshRate?: number, //by Hz
  supportedNetwork: string
}

export interface ComputerProduct extends Product {
  deviceType: Array<"Desktop" | "Laptop" | "CPU" | "Office" | "Gaming" | "Accessories">,
  batteryCharacteristics?: string,
  screenSize?: number,       //By inches
  screenResolution?: string,
  power: number,
  compatibility: string,    //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
  innerMemory: Array<number>,      //By GB 
  ramMemory: number,
  operatingSystem: string,
  camera?: number, //by MP
  videoCard?: string, //by MP
  soundReproduction: string,
  processor?: string,
  refreshRate?: number, //by Hz
  supportedNetwork: string
}