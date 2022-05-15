import { prisma } from "../../../database/prismaClient"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman){ 
    // Receber username, password
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: username
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid")      
    }
    // Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error("Username or password invalid") 
    }
    //Gerar o token

    const token =  sign({username}, "98d7fc1c47596c741f869d874ee37980", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })
    
    return token
  }
}