import { PrismaClient as Prisma } from "@prisma/client";


export class PrismaService {
  public readonly client: Prisma; 

  constructor() {
    this.client = new Prisma();
  }

  async close() {
    await this.client.$disconnect();
  }
}