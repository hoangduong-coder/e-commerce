/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComputerProduct, PhoneProduct } from "./helpers/productHelper"

export type Category = {
  id: string
  title: string
  pictureUrl: string
  type: string
}

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

export type ProductTypeProps = {
  all: Array<PhoneProduct | ComputerProduct>
  byId: PhoneProduct | ComputerProduct
  loading: "idle" | "pending"
}

export type PricingMethod = { key: number, value: string }

export type ProductDetailSelectionProps = {
  initialPricingMethods: Array<PricingMethod>,
  pricingMethod: PricingMethod,
  selectedPrice: number,
  product: PhoneProduct | ComputerProduct,
  handleChangeMemory: (e: any, value: any) => void,
  selectedMemory: number,
  handleChangeColor: (e: any, value: any) => void,
  selectedColor: string,
  handleChangePriceMethods: (e: any, value: any) => void
}