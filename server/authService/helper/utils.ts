import * as amqp from "amqplib"
import * as dotenv from "dotenv"

import jwt, { Secret } from "jsonwebtoken"

import User from "../model/user"

dotenv.config()

export const PORT = process.env.PORT
export const SECRET_KEY: Secret = process.env.SECRET as Secret
export const MONGO_URL: string = process.env.MONGO_URL as string
export const RABBITMQURI: string = process.env.RABBITMQURI as string

export const consumeVerifyAdminMessage = async () => {
  const connection = await amqp.connect(RABBITMQURI)
  const channel = await connection.createChannel()
  const queueName = "VERIFY_ADMIN"
  await channel.assertQueue(queueName, {
    durable: false,
  })

  channel.consume(queueName, (data: any) => {
    if (!data) return
    const { token } = JSON.parse(data.content)
    if (!token) {
      channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify({ passed: false, error: "Token invalid" }))
      )
    } else {
      jwt.verify(
        token.slice(7),
        SECRET_KEY,
        async (err: any, decodedToken: any) => {
          if (err) {
            channel.sendToQueue(
              queueName,
              Buffer.from(JSON.stringify({ passed: false, error: err.message }))
            )
          } else {
            const user = await User.findById(decodedToken.id)

            if (!user || user === null || user.role !== "Admin") {
              throw new Error("You don't have right to edit this part")
            }

            channel.sendToQueue(
              queueName,
              Buffer.from(JSON.stringify({ passed: true }))
            )
            channel.ack(data)

          }
        }
      )
    }
  })
}
