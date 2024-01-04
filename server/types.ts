export type Product = {

}

export type OrderItem = {

}

export type Order = {

}

export type User = {
  name: string,
  email: string,
  passwordHash?: string,
  streetAddress: string,
  postalCode: string,
  city: string,
  phone?: string
  orderHistory?: Array<Order>,
  avatar?: string,
  role: "Admin" | "Visitor"
}