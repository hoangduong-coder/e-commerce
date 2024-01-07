import bcrypt from "bcrypt"
import { Router } from "express"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../helper/utils"
import User from "../schema/user"

const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    role: req.body.role,
  })
  const isPasswordCorrect =
    user === null
      ? false
      : //@ts-ignore
      await bcrypt.compare(req.body.password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: "Invalid email or password",
    })
  }

  const tokenSignInUser = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(tokenSignInUser, SECRET_KEY, { expiresIn: 3600 })
  res.status(200).send({ token, email: user.email, name: user.name })
})

export default loginRouter
