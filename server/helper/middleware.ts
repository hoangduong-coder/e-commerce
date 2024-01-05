import { NextFunction, Response } from "express"

export const unknownEndpoint = (response: Response) => {
  response.status(404).json({ error: "Unknown endpoint" })
}

export const handleError = (
  error: any,
  response: Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" })
  } else if (error.name === "ValidationError") {
    return response.status(401).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response
      .status(401)
      .json({ error: "Authentication invalid or missing" })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" })
  } else {
    console.log("Unexpected error: ", error)
    return response.status(500).json({ error: "Internal server error." })
  }

  next(error)
}