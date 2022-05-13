import { Request, Response } from 'express'
import { CreateClienteUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body
    const createClientUseCase = new CreateClienteUseCase()
    const result = await createClientUseCase.execute({
      username,
      password
    })

    return response.json(result)
  }
}