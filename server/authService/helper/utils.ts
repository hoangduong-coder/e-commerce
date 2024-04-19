import * as dotenv from "dotenv"

import { Request, Response } from "express"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"

import User from "../model/user"

dotenv.config()

export const PORT = process.env.PORT
export const SECRET_KEY: Secret = process.env.SECRET as Secret
export const MONGO_URL: string = process.env.MONGO_URL as string
export const RABBITMQURI: string = process.env.RABBITMQURI as string

export const verifyAdmin = async (request: Request, response: Response) => {
  const authorizedToken = request.headers["authorization"]

  const decodedToken = authorizedToken
    ? (jwt.verify(authorizedToken.slice(7), SECRET_KEY) as JwtPayload)
    : null

  if (!decodedToken?.id) {
    throw new Error("token invalid")
  }

  const user = await User.findById(decodedToken.id)

  if (!user || user === null || user.role !== "Admin") {
    throw new Error("You don't have right to edit this part")
  }
}

