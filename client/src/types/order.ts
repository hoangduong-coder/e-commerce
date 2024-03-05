import { Color, ComputerProduct, PhoneProduct } from "./helpers/productHelper"

export interface OrderedProduct {
  product: PhoneProduct | ComputerProduct,
  quantity: number,
  selectedInnerMemory?: number,
  selectedColor?: Color,
  selectedPaymentDuration: number,
  price: number
}

export type OrderInitialState = {
  all: Array<OrderedProduct>
}