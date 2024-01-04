import jwt, { Secret } from "jsonwebtoken"

import bcrypt from "bcrypt"
import { Router } from "express"
import User from "../schema/user"

const secretKey: Secret | undefined = process.env.SECRET
const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
  const { body } = req.body
  const user = await User.findOne({ email: body.email, role: body.role })
  const isPasswordCorrect =
    !user || typeof user === 'object'
      ? false
      //@ts-ignore
      : bcrypt.compare(body.password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: "Invalid email or password"
    })
  }

  if (!secretKey) {
    res.status(500).json({
      error: "Internal error"
    })
  } else {
    const tokenSignInUser = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(tokenSignInUser, secretKey, { expiresIn: 3600 })
    res.status(200).send({ token, email: user.email, name: user.name })
  }
})

export default loginRouter