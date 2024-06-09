import { S3Client } from "@aws-sdk/client-s3";

export class S3Provider{
  public client: S3Client
  public r2: S3Client
   constructor(){
    this.client = new S3Client({
      region: 'af-south-1',
      credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID
    },

  })
   }
   
}