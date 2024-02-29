export type GetProductProps = {
  category?: string
}

export type GetProductByIdProps = { productId: string }

export type CreateOrderProps = {
  name: string
  email: string
  streetAddress: string
  postalCode: string
  city: string
  phone: string
  orders: Array<{
    productID: string
    quantity: number
    selectedProductMemo?: number
  }>
  deliveryType: "None" | "Normal" | "Fast"
}
