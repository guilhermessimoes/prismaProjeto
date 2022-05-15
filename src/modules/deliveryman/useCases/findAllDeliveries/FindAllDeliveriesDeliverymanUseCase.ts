import { prisma } from "../../../../database/prismaClient";

interface IFindAllDeliveries {
  id_deliveryman: string
}

export class FindAllDeliveriesDeliverymanUseCase {
  async execute({ id_deliveryman }: IFindAllDeliveries) {
    const deliveries = await prisma.deliveryman.findMany({
      where: { 
        id: id_deliveryman
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