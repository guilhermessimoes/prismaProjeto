import { prisma } from "../../../database/prismaClient"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient){ 
    // Receber username, password
    const client = await prisma.clients.findFirst({
      where: {
        username: username
      }
    })

    if (!client) {
      throw new Error("Username or password invalid")      
    }
    // Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error("Username or password invalid") 
    }
    //Gerar o token

    const token =  sign({username}, "2aa54a893c2e3c940e3ea251752572e0dfb66d9d", {
      subject: client.id,
      expiresIn: "1d"
    })
    
    return token
  }
}