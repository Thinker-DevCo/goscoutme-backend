import { NotFoundError } from "routing-controllers";
import { PrismaService } from "../../providers/prisma/prismaClient";
import { CreateMedia } from "./dto/CreateMedia.dto";
import { HttpStatusCode } from "../../providers/errorProvider";
import { supabase } from "../../providers/supabase/supabase";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Provider } from "../../providers/s3/s3Client";
import { PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";

class MediaUseCase {
  private readonly prisma: PrismaService
  private readonly s3: S3Provider
  constructor(){
    this.prisma = new PrismaService();
    this.s3 = new S3Provider();
  }
  async executeCreateMedia(dto: CreateMedia, user_id: string) {
    const user = await this.prisma.client.userAthleteProfile.findFirst({
      where: {
        profile: {
          public_id: user_id
        }
      }
    })
    if(!user) throw new NotFoundError('user was not found')
    const file = await this.prisma.client.userMedia.create({
      data: {
        athlete_id: user.id,
        media_url: `https://goscoutmee.s3.af-south-1.amazonaws.com/${user.id}/${dto.name.replace(
          / /g,
          '+',
        )}`,
        type: dto.type,
        name: dto.name
      }
    })
    return file
  }

  async executeCreatePresignedUser(user_id: string, file_name: string, file_type: string){
    const signedUrl = await getSignedUrl(this.s3.client,new PutObjectCommand({
      Bucket: 'goscoutmee',
      Key: `${user_id}/${file_name}`,
      ACL: 'public-read-write',
      ContentType: file_type
    }), {expiresIn: 600})
    return signedUrl
  }

  async executeReadMedia(athlete_id: number) {
    const media = await this.prisma.client.userMedia.findMany({
      where: {
        athlete_id: athlete_id
      }
    })
    return media
  }

  async executeUpdateMedia() {
    // Implement the update use case logic here
  }

  async executeDeleteMedia() {
    // Implement the delete use case logic here
  }
}

export { MediaUseCase };
