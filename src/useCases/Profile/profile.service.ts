import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { ICreateProfileDto } from "./dto";


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

  async executeReadProfile() {
    // Implement the read use case logic here
  }

  async executeUpdateProfile() {
    // Implement the update use case logic here
  }

  async executeDeleteProfile() {
    // Implement the delete use case logic here
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
