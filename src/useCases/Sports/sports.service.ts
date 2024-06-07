import { PrismaService } from "../../providers/prisma/prismaClient";

class SportsUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeReadSportsPositions(sport_id: number) {
    const sportsPositions = await this.prisma.client.sportPosition.findMany({
      where: {
        sport_id: sport_id
      }
    })
    return sportsPositions
  }
}

export { SportsUseCase };
