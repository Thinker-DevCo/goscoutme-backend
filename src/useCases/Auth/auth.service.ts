import { AuthResponse, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { supabase } from "../../providers/supabase/supabase";
import { ICreateAuthDto, ISignIn } from "./dto/CreateAuth.dto";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { PrismaService } from "../../providers/prisma/prismaClient";

class AuthUseCase {
  private readonly prisma: PrismaService
  constructor(){
    this.prisma = new PrismaService();
  }
  async executeSignUp(dto:ICreateAuthDto) {
    const user: AuthResponse = await supabase.auth.signUp({
      options: {
        data: {
          firstName: dto.email,
          lastName: dto.last_name
        }
      },
      email: dto.email,
      password: dto.password
    })
    if(user.error) throw new BaseError('FORBIDDEN', HttpStatusCode.FORBIDDEN, true, 'User already exists')

    // const new_user = await this.prisma.client.profiles.create({
    //   data: {
    //     first_name: dto.first_name,
    //     last_name: dto.last_name,
    //     email: user.data.user.email,
    //     birt_date: dto.date,
    //     sex: dto.sex,
    //     address: dto.address ? dto.address : null,
    //     mobile: dto.mobile ? dto.mobile : null,
    //     phone: dto.phone ? dto.phone : null,
    //     nationality: dto.nationality,
    //     citzenship: dto.citzenship,
    //     public_id: user.data.user.id,
    //   }
    // })
    delete user.data.user.user_metadata,
    delete user.data.user.identities
    return {
      session: user.data.session,
      user: user.data.user,
    }
  }

  async executeSignIn(dto: ISignIn) {
    const user: AuthResponse = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password
    })
    const user_profile = await this.prisma.client.profiles.findUnique({
      where: {
        public_id: user.data.user.id
      }
    })
    delete user.data.user.user_metadata,
    delete user.data.user.identities
    return {
      profile: user_profile,
      session: user.data.session,
      user: user.data.user
    }
  }


  async executeRefreshToken(refresh_token: string) {
    const {data, error} = await supabase.auth.refreshSession({refresh_token: refresh_token})
    if(error) throw new BaseError(error.code, error.status, false, error.message)
    return data
  }

  async getCurrentUser(access_token: string){
    const {data, error} = await supabase.auth.getUser(access_token)
    if(error) throw new BaseError(error.code, error.status, false, error.message)
    const profile = await this.prisma.client.profiles.findUnique({
      where: {
        public_id: data.user.id
      }
    })
    if(error) throw new BaseError(error.code, error.status, false, error.message)

    return{
      profile: profile,
      user: data.user
    }
  }
}

export { AuthUseCase };
