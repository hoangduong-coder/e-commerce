import { createSlice } from "@reduxjs/toolkit"
import { getProduct } from "api/orderAndProduct"
import { ProductTypeProps } from "types/product"
import { GetProductProps } from "types/request"
import { AppDispatch } from "./store"

const initialState: ProductTypeProps = {
  all: [],
  byId: {
    id: "",
    updatedAt: "",
    createdAt: "",
    title: "",
    category: "Computer",
    availability: 0,
    brand: "",
    price: 0,
    picture: "",
    description: "",
    eanCode: "",
    manufacturerProductCode: ""
  },
  loading: "idle",
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    pageLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending"
      }
    },
    setProducts(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle"
        state.all = action.payload
      }
    },
    setProductById(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle"
        state.byId = action.payload
      }
    },
  },
})

export const { setProducts, setProductById, pageLoading } = productSlice.actions

export const initializeProducts =
  ({ category }: GetProductProps) =>
    async (dispatch: AppDispatch) => {
      dispatch(pageLoading())
      const productList = await getProduct({ category })
      dispatch(setProducts(productList))
    }

export default productSlice.reducer
