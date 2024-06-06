import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { ICreateProfileDto, UpdateProfileDto } from "./dto";
import { IFilterAthletesParams } from "./types";


class ProfileUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeCreateProfile(dto: ICreateProfileDto) {
    await this.validateUser(dto)
    const profile = await this.prisma.client.profiles.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        birt_date: new Date(dto.birt_date).toISOString(),
        sex: dto.sex,
        address: dto.address ? dto.address : null,
        mobile: dto.mobile ? dto.mobile : null,
        phone: dto.phone ? dto.phone : null,
        nationality: dto.nationality,
        public_id: dto.public_id,
        sport_id: dto.sport_id,
      }
    })
    if(dto.userType === 'ATHLETE'){
      const ahtlete = await this.prisma.client.userAthleteProfile.create({
        data: {
          age: dto.age,
          height: dto.height,
          weight: dto.weight,
          profile_id: profile.id,
          citzenship: dto.citzenship,
          height_metric: dto.height_metric,
          weight_metric: dto.weight_metric
        }
      })
      return{
        profile: profile,
        ahtlete: ahtlete
      }
    }else {
      const scout = await this.prisma.client.userScoutProfile.create({
        data: {
          profile_id: profile.id,
          affiliations: dto.affiliations,
          organization_id: dto.organization_id,
        }
      })
      return{
        profile: profile,
        scout: scout
      }
    }
  }

  async executeReadAthletes(page: number, items:number) {
    const athlete = await this.prisma.client.userAthleteProfile.findMany({
      skip: page * items,
      take: items,
      include: {
        profile: true,
      }
    })
    if(!athlete) throw new BaseError('NOT FOUND',404, false,'there are no athlete users in the database')
    return [...athlete]
  }
  async executeReadAthlete(public_id: string) {
    const athlete = await this.prisma.client.userAthleteProfile.findFirst({
      include: {
        profile: true,
      },
      where: {
        profile: {
          public_id
        }
      }
    })
    if(!athlete) throw new BaseError('NOT FOUND',404, false,'there are no athlete users in the database')
    return athlete
  }

  async filterAthletes(params: IFilterAthletesParams) {
    const whereClause: any = {
      profile: {},
    };

    if (params.sex) whereClause.profile.sex = params.sex;
    if (params.ageMin !== undefined) whereClause.age = { gte: params.ageMin };
    if (params.ageMax !== undefined) whereClause.age = { lte: params.ageMax };
    if (params.status) whereClause.status = params.status;
    if (params.country) whereClause.profile.nationality = params.country;

    const athletes = await this.prisma.client.userAthleteProfile.findMany({
      skip: params.page * params.items,
      take: params.items,
      where: whereClause,
      include: {
        profile: true,
      },
    });

    return athletes;
  }
  async executeUpdateProfile(id: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.client.profiles.update({
      where: { id: parseInt(id) },
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        birt_date: dto.birt_date ? new Date(dto.birt_date).toISOString() : undefined,
        sex: dto.sex,
        address: dto.address,
        mobile: dto.mobile,
        phone: dto.phone,
        nationality: dto.nationality,
        sport_id: dto.sport_id,
      }
    });
    return profile;
  }


  private async validateUser(dto: ICreateProfileDto){
    if(!dto.userType ) throw new BaseError('BAD REQUEST', HttpStatusCode.BAD_REQUEST, false, 'Error creating profile')
    if(dto.userType === 'ATHLETE' ){
      if(!dto.height || !dto.height || !dto.weight || !dto.weight_metric 
        || !dto.citzenship || !dto.status || !dto.age 
       )throw new BaseError('BAD REQUEST', HttpStatusCode.BAD_REQUEST, false, 'could not create athlete profile ')
       return;
     }
  }
}





export { ProfileUseCase };
