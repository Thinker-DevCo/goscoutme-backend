import { PrismaService } from "../../providers/prisma/prismaClient";

class NotificationsUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeSubscribeUser(user_id) {

  }

  async executeReadNotifications(id: number) {
    console.log(id)
    const notifications = await this.prisma.client.notifications.findMany({
      take: 6,
      where: {
        profile_id: id,
      },
      orderBy: {
        created_at: "desc"
      }
    })
    return notifications
  }

  async executeUpdateNotifications(id: number) {
    await this.prisma.client.notifications.updateMany({
      where: {
        profile_id: id
      },
      data: {
        status: "VIEWED"
      }
    })
  }

  async executeDeleteNotifications() {
    // Implement the delete use case logic here
  }
}

export { NotificationsUseCase };
