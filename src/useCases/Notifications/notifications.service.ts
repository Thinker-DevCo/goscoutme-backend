import { PrismaService } from "../../providers/prisma/prismaClient";

class NotificationsUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeSubscribeUser(user_id) {

  }

  async executeReadNotifications() {
    // Implement the read use case logic here
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
