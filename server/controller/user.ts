import { Request, Response, Router } from "express"

import bcrypt from "bcrypt"
import { passwordStrength } from "check-password-strength"
import User from "../model/user"

const userRouter = Router()

userRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findById(req.params.id).populate("orderHistory")
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(401).json({ error: "Invalid user id" })
    }
  }
)

userRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
  if (passwordStrength(req.body.password).id < 2) {
    return res
      .status(400)
      .json({ error: "Your password is not strong enough!" })
  } else {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: passwordHash,
      streetAddress: req.body.streetAddress,
      postalCode: req.body.postalCode,
      city: req.body.city,
      phone: req.body.phone,
      role: req.body.role,
    })
    const savedUser = await user.save()
    return res.status(201).json(savedUser)
  }
})

userRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findById(req.params.id)
    if (
      req.body.password &&
      user &&
      passwordStrength(req.body.password).id >= 2
    ) {
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      user.passwordHash = passwordHash
      await user.save()
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
    return res.json(200).json(updatedUser)
  }
)

export default userRouter
