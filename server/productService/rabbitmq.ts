import * as amqp from "amqplib"

import { RABBITMQURI } from "./helper/utils"

let connection: amqp.Connection
let channel: amqp.Channel

const createChannel = async () => {
  try {
    connection = await amqp.connect(RABBITMQURI)
    channel = await connection.createChannel()
  } catch (err) {
    console.log("Error in establish product RabbitMQ", err)
  }
}

export const verifyAdmin = async (authHeader: string | undefined) => {
  try {
    if (!channel) {
      await createChannel()
    }
    const exchangeName = "VERIFY_ADMIN"

    await channel.assertExchange(exchangeName, "direct")
    await channel.publish(exchangeName, "", Buffer.from(JSON.stringify({ token: authHeader })))
  } catch (err: any) {
    console.log("Error in verifying admin", err.message)
  }
}