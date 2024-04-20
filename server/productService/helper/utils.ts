import * as dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT
export const MONGO_URL: string = process.env.MONGO_URL as string
export const RABBITMQURI: string = process.env.RABBITMQURI as string


