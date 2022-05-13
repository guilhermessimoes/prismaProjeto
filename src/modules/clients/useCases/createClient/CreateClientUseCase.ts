import { prisma } from "../../../../database/prismaClient"

import { hash  } from "bcryptjs"

interface ICreateClient {
  username: string
  password: string
}

export class CreateClienteUseCase  {
  async execute({ password, username}: ICreateClient) : Promise<void>{
    const clientExists = await prisma.clients.findFirst({
      where: { 
        username: {
          mode: "insensitive"
        }
      }
    })

    if (clientExists) {
      throw new Error(`Client ${username} already exists`)
    }

    const hashPassword = await hash(password, 10)

    await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })
  }
}