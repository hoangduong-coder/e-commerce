export interface User {
  name: string,
  email: string,
  passwordHash: string,
  postalCode: string,
  city: string,
  phone: string,
  avatar?: string,
  role: "Admin" | "Visitor"
}