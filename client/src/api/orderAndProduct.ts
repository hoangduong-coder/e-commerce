import { CreateOrderProps, GetProductProps } from 'types/request';
import { orderApi, productApi } from "../utils";

import axios from "axios";

export const getProduct = async ({ category }: GetProductProps) => {
  const response = await axios.get(productApi, { params: { category } })
  return response.data
}

export const getOrder = async () => {
  const response = await axios.get(orderApi)
  return response.data
}

export const createOrder = async (order: CreateOrderProps) => {
  const response = await axios.post(orderApi, order)
  return response.data
}