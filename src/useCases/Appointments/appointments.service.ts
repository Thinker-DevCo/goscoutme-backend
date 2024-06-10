import { NotFoundError } from "routing-controllers";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { CreateAppointmentsDto } from "./dto";

class AppointmentsUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeCreateAppointments(scout_id: string, dto: CreateAppointmentsDto) {
    console.log(scout_id)
    const scout = await this.prisma.client.userScoutProfile.findFirst({
      where: {
        profile: {
          public_id: scout_id
        }
      }
    })
    console.log(scout)
    if(!scout) throw new NotFoundError('there is no scout with the provided id')
    const athlete = await this.prisma.client.userAthleteProfile.findFirst({
      where: {
        profile: {
          public_id: String(dto.athlete_id)
        }
      }
  })  
    if(!athlete) throw new NotFoundError('there is no athlete with the provided id')
    const appointments = await this.prisma.client.userAppointments.create({
      data: {
        scout_id: scout.id, 
        athlete_id: athlete.id,
        scheduled: new Date(dto.scheduled).toISOString(),
        description: dto.description,
        duration: dto.duration,
        title: dto.title
      }
    })  
    return appointments
  }

  async executeReadAppointments(id: string) {
      const appointments = await this.prisma.client.userAppointments.findMany({
        where: {
          OR: [
            {
              athlete: {
                profile: {
                  public_id: id
                }
              },
            },
            {
              scout: {
                profile: {
                  public_id: id
                }
              }
            }
          ]
        }
      })  
      return appointments
  }

  async executeUpdateAppointments() {
    // Implement the update use case logic here
  }

  async executeDeleteAppointments() {
    // Implement the delete use case logic here
  }
}

export { AppointmentsUseCase };
