import { Types } from "mongoose"
import { User } from "./user"

export type Color = {
  colorCode: string,
  colorName: string
}

export type AMQPOrderMessage = {
  status: "Accepted" | "Rejected",
  error?: unknown,
  returnedOrders?: Array<OrderedProduct>
}

export interface OrderedProduct {
  item: Types.ObjectId,
  quantity: number,
  selectedInnerMemory?: number,
  selectedColor?: Color,
  selectedPaymentDuration: number,
  price: number
}

export interface Order {
  user: User,
  orders: {
    list: Array<OrderedProduct>,
    deliveryType: "None" | "Normal" | "Fast",
    status: "Progress" | "Delivered" | "Cancelled" | "Received",
    price: number
  }
}