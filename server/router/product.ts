import { Router } from "express";

const router = Router()
router.get("/", (_req, _res) => {
  console.log("Product list")
})
router.get("/:category", (req, _res) => {
  console.log(`List of ${req.params.category}`)
})