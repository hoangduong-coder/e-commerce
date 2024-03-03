import { createSlice } from "@reduxjs/toolkit"
import { Color } from "types/helpers/productHelper"
import { AppDispatch } from "./store"

type OrderedProduct = {
  productID: string,
  quantity: number,
  selectedInnerMemory?: number,
  selectedColor?: Color,
  selectedPaymentDuration: number,
}

interface OrderInitialState {
  all: Array<OrderedProduct>
}

const initialState: OrderInitialState = {
  all: []
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.all = state.all.map(order => order.productID === action.payload.productID ? action.payload : order)
    },
    createOrder: (state, action) => {
      state.all = state.all.concat(action.payload)
    },
    initializeAll: (state, action) => {
      state.all = action.payload
    }
  }
})

export const { updateOrder, createOrder, initializeAll } = orderSlice.actions

export const addToCart = (productOrderData: OrderedProduct) => {
  return (dispatch: AppDispatch) => {
    if (initialState.all.find(order => order.productID !== productOrderData.productID)) {
      dispatch(createOrder(productOrderData))
    }
  }
}

export default orderSlice.reducer