import { S3Client } from "@aws-sdk/client-s3";

export class S3Provider{
  public client: S3Client
  public r2: S3Client
   constructor(){
    this.client = new S3Client({
      region: 'af-south-1',
      credentials: {
      accessKeyId: "AKIAZYDEXZIX3D4R7TMI",
      secretAccessKey: "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"
    },

  })
   }
   
}