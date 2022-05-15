import { prisma } from "../../../../database/prismaClient";

interface IFindDeliveries{
  id_client: string
}

export class FindAllDeliveriesUseCase { 
  async execute({ id_client }: IFindDeliveries){
    const deliveries = await prisma.clients.findMany({
      where: { 
        id: id_client
      },
      select: {
        Deliveries: true,
        id: true,
        username: true
      }
    })

    return deliveries
  }
}