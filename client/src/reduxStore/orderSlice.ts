import { OrderInitialState, OrderedProduct } from "types/order";

import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const initialState: OrderInitialState = {
  all: []
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.all = state.all.map(order => order.product.id === action.payload.product.id ? action.payload : order)
    },
    createOrder: (state, action) => {
      state.all.push(action.payload)
    },
    deleteOrder: (state, action) => {
      state.all = state.all.filter(order => order.product.id !== action.payload)
    },
    initializeAll: (state, action) => {
      state.all = action.payload
    }
  }
})

export const { updateOrder, createOrder, deleteOrder, initializeAll } = orderSlice.actions

export const addToCart = (productOrderData: OrderedProduct) => {
  return (dispatch: AppDispatch) => {
    if (initialState.all.find(order => order.product.id !== productOrderData.product.id)) {
      dispatch(createOrder(productOrderData))
    }
  }
}

export default orderSlice.reducer