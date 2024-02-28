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
  all: Array<Product>
  byId: Product
  loading: "idle" | "pending"
}
