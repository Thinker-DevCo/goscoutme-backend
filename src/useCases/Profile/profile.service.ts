import { AthleteStatusOptions } from "@prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { ICreateProfileDto, UpdateProfileDto } from "./dto";
import { IFilterAthletesParams } from "./types";


class ProfileUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeCreateProfile(dto: ICreateProfileDto, user_id: string) {
    await this.validateUser(dto)
    const profile = await this.prisma.client.profiles.create({
      include: {
        sport: true,
        organization: true
      },
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        birth_date: new Date(dto.birth_date).toISOString(),
        sex: dto.sex,
        affiliations: dto.affiliations || null,
        address: dto.address ? dto.address : null,
        mobile: dto.mobile ? dto.mobile : null,
        phone: dto.phone ? dto.phone : null,
        organization: {
          create: {
            org_document_url: dto.org_document_url || null,
            org_email: dto.org_email,
            org_mobile: dto.org_mobile ||null,
            org_name: dto.org_name|| null,
            org_phone: dto.org_phone || null
          }
        },
        nationality: dto.nationality,
        public_id:user_id,
        sport_id: dto.sport_id,
      }
    })
    if(dto.userType === 'ATHLETE'){
      const athlete = await this.prisma.client.userAthleteProfile.create({
        data: {
          age: dto.age,
          height: dto.height,
          weight: dto.weight,
          profile_id: profile.id,
          citzenship: dto.citzenship,
          height_metric: dto.height_metric,
          weight_metric: dto.weight_metric,
          career_statistics: {
            create: {
              game_appearances: dto.game_appearances || 0,
              minutes_played: dto.minutes_played || 0,
              field_goals: dto.field_goals || 0,
              game_started: dto.game_started || 0,
            }
          },
          sport_position_id: dto.sport_position_id,
          status: dto.status || AthleteStatusOptions.NOT_SPECIEFIED,
        }
      })
      return{
        profile: profile,
        athlete: athlete
      }
    }else {
      const scout = await this.prisma.client.userScoutProfile.create({
        data: {
          profile_id: profile.id,
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
        profile: {include: {sport: true}},
        sport_position: true
      
      }
    })
    if(!athlete) throw new BaseError('NOT FOUND',404, false,'there are no athlete users in the database')
    return [...athlete]
  }
  async executeReadAthlete(public_id: string) {
    const athlete = await this.prisma.client.userAthleteProfile.findFirst({
      include: {
        profile: {
          include: {
            organization: true
          },
        },
        sport_position: true,
        media: true,
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
      profile: {}
    };
    const positionQuery = this.stringToNumberArray(params.positions)
    const sexQuery = this.stringToStringArray(params.sex)
    const statusQuery = this.stringToStringArray(params.status)
    const countryQuery = this.stringToStringArray(params.country)
    if(params.id) whereClause.profile.public_id = { contains: params.id}
    if(positionQuery && positionQuery.length > 0) whereClause.sport_position_id = whereClause.sport_position_id = { in: positionQuery};
    if (sexQuery && sexQuery.length > 0) whereClause.profile.sex = whereClause.profile.sex = {in: sexQuery};
    if (params.ageMin ) whereClause.age = { gte: params.ageMin };
    if (params.ageMax) whereClause.age = { lte: params.ageMax };
    if (statusQuery && statusQuery.length > 0) whereClause.status = whereClause.status = {in: statusQuery};
    if (countryQuery && countryQuery.length > 0) whereClause.profile.nationality = whereClause.profile.nationality = {in: countryQuery};
    const athletes = await this.prisma.client.userAthleteProfile.findMany({
      skip: params.page * params.items,
      take: params.items,
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: {
        profile: {
          include: {
            organization: true
          }
        },
        sport_position: true
      },
    });

    return athletes;
  }
  async executeUpdateProfile(id: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.client.profiles.update({
      where: { public_id: id },
      data: {
        ...dto
      }
    });
    return profile;
  }


  private async validateUser(dto: ICreateProfileDto){
    if(!dto.userType ) throw new BaseError('BAD REQUEST', HttpStatusCode.BAD_REQUEST, false, 'Error creating profile')
    if(dto.userType === 'ATHLETE' ){
      if(!dto.height || !dto.height|| !dto.weight || !dto.weight_metric 
        || !dto.citzenship || !dto.status || !dto.age  || !dto.sport_position_id
       )throw new BaseError('BAD REQUEST', HttpStatusCode.BAD_REQUEST, false, 'could not create athlete profile ')
       return;
     }
  }
  private stringToNumberArray(text: string){
    if(!text) return []
    const data = text.split('-');
    const values = []
    for (let i =0; i<= data.length; i++){
      if(Number(data[i])){
        values.push(Number(data[i]))
      }
    }
    return values
  }
  private stringToStringArray(text: string){
    if(!text) return []
    const data = text.split('-');
    const values = []
    for (let i =0; i<= data.length; i++){
      if(data[i]){
        values.push(data[i])
      }
    }
    return values
  }
}





export { ProfileUseCase };
