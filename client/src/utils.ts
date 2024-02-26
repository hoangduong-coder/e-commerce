import picture3 from "./assets/TV-category.jpg"
import picture1 from "./assets/computer_category.jpg"
import picture4 from "./assets/games-accessories.webp"
import picture7 from "./assets/kitchen.jpg"
import picture2 from "./assets/phone-accessories.webp"
import picture5 from "./assets/tablets.jpg"
import picture6 from "./assets/working-office.jpg"

export const CATEGORIES = [
  {
    id: "computer",
    title: "Computer & Peripherals",
    pictureUrl: picture1,
    type: "Computer"
  },
  {
    id: "phone",
    title: "Phones & Accessories",
    pictureUrl: picture2,
    type: "Phone"
  },
  {
    id: "tv",
    title: "TV & Accessories",
    pictureUrl: picture3,
    type: "TV"
  },
  {
    id: "games",
    title: "Games",
    pictureUrl: picture4,
    type: "Games"
  },
  {
    id: "tablet",
    title: "Tablets & Accessories",
    pictureUrl: picture5,
    type: "Tablets"
  },
  {
    id: "office",
    title: "Working office",
    pictureUrl: picture6,
    type: "Office"
  },
  {
    id: "kitchen",
    title: "Kitchen",
    pictureUrl: picture7,
    type: "Kitchen"
  },
]

export const orderApi = `${import.meta.env.VITE_SERVER_URL}/api/orders`
export const productApi = `${import.meta.env.VITE_SERVER_URL}/api/products`
export const userApi = `${import.meta.env.VITE_SERVER_URL}/api/users`
export const loginApi = `${import.meta.env.VITE_SERVER_URL}/api/auth`