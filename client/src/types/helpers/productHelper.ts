import { Product } from "types/product";

export interface PhoneProduct extends Product {
  batteryCharacteristics: string,
  screenSize: number,       //By inches
  screenResolution: string,
  compatibility: string,    //Available connectors info: e.g., Bluetooth, Wifi, 4G-5G, USB Type C, HDMI, etc.
  innerMemory: Array<number>,      //By GB 
  ramMemory: number,
  color: Array<string>,
  operatingSystem: string,
  camera: number, //by MP
  frontCamera: number, //by MP
  resistanceAbility: "dust" | "water" | "impact",
  numberOfCameras: number,
  processor: string,
  refreshRate: number, //by Hz
  supportedNetwork: string
}

export interface ComputerProduct extends Product {
  computerType: "Desktop" | "Laptop" | "CPU",
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