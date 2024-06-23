import { NotFoundError } from "routing-controllers";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { ICreateScoutsnotesDto } from "./dto";

class ScoutsnotesUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeCreateScoutsnotes(scout_id: string, dto: ICreateScoutsnotesDto) {
    const scout = await this.prisma.client.userScoutProfile.findFirst({
      where: {
        profile: {
          public_id: scout_id,
        }
      }
    })
    if(!scout) throw new NotFoundError(`There is no scout with the id ${scout_id} in the database`); 
    const athlete = await this.prisma.client.userAthleteProfile.findFirst({ where:{
        profile: {
          public_id: dto.athlete_id
        }
      }
    })
    if(!athlete) throw new NotFoundError(`There is no athlete with the id ${dto.athlete_id} in the database`)
    
    const scoutsNotes = await this.prisma.client.scoutNotes.upsert({
      where: {
        scout_id_athlete_id: {
          scout_id: scout.id,
          athlete_id: athlete.id
        }
      },
      update: {
        scout_notes: dto.scout_notes,
        color_tag: dto.color_tag
      },
      create: {
        athlete_id: athlete.id,
        scout_id: scout.id,
        scout_notes: dto.scout_notes,
        color_tag: dto.color_tag
      }
    })
    return scoutsNotes
  }

  async executeReadScoutsnotes(scout_id: string, athlete_id: string) {
    const scout = await this.prisma.client.userScoutProfile.findFirst({
      where: {
        profile: {
          public_id: scout_id,
        }
      }
    })
    if(!scout) throw new NotFoundError(`There is no scout with the id ${scout_id} in the database`); 
    const athlete = await this.prisma.client.userAthleteProfile.findFirst({
      where:{
        profile: {
          public_id: athlete_id
        }
      }
    })
    if(!athlete) throw new NotFoundError(`There is no athlete with the id ${athlete_id} in the database`)
    const scout_note = this.prisma.client.scoutNotes.findUnique({
      where: {
        scout_id_athlete_id: {
          scout_id: scout.id,
          athlete_id: athlete.id
        }
      }
    })
    if(!scout_note) return null
    return scout_note
  }

  async executeReadAllScoutsNotes(scout_id: string){
    const scout = await this.prisma.client.userScoutProfile.findFirst({
      where: {
        profile: {
          public_id: scout_id,
        }
      }
    })
    if(!scout) throw new NotFoundError(`There is no scout with the id ${scout_id} in the database`);
    
    return await this.prisma.client.scoutNotes.findMany({
      where: {
        scout_id: scout.id,
      }
    })
    

  }
  async executeUpdateScoutsnotes() {
    // Implement the update use case logic here
  }

  async executeDeleteScoutsnotes() {
    // Implement the delete use case logic here
  }
}

export { ScoutsnotesUseCase };
