import { S3Client } from "@aws-sdk/client-s3";

export class S3Provider{
  public client: S3Client
   constructor(){
    this.client = new S3Client({credentials: {
      accessKeyId: "2261de9fb5a0a8d95de7d9049d1d17c7",
      secretAccessKey: "1d1524448f2ba8f6005fdceeae6f66fcc6ecece91004f164237717a1f5fae68f"
    },
    endpoint: 'https://mkroqhhzgdfcinnephdx.supabase.co/storage/v1/s3', 
    region: 'eu-central-1'})
   }
}