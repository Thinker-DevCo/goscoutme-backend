import { S3Client } from "@aws-sdk/client-s3";

export class S3Provider{
  public client: S3Client
  public r2: S3Client
   constructor(){
    this.client = new S3Client({credentials: {
      accessKeyId: "2261de9fb5a0a8d95de7d9049d1d17c7",
      secretAccessKey: "1d1524448f2ba8f6005fdceeae6f66fcc6ecece91004f164237717a1f5fae68f"
    },
    endpoint: 'https://mkroqhhzgdfcinnephdx.supabase.co/storage/v1/s3', 
    region: 'eu-central-1'})
    this.r2 = new S3Client({credentials: {
      accessKeyId: "77fb44ca765e574164552b8039d72875",
      secretAccessKey: "6ed4dcbf2f3ece029772622255313512e52b3cef8c339f894e7add5648a3a2b6"
    },
    endpoint: 'https://58e681f29276085d13bda8791653edbc.r2.cloudflarestorage.com',
  region: "auto"})
   }
   
}