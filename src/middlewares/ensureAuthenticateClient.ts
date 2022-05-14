import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface IPayload { 
  sub: string
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction){

  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing"})
  }

  const [, token] = authHeader.split(" ")

  try {
   const { sub } = verify(token, "2aa54a893c2e3c940e3ea251752572e0dfb66d9d") as IPayload
   request.id_client = sub
   return next()
  } catch (error) {
    return response.status(401).json({
      message: "Token Invalid"
    })
  }
}