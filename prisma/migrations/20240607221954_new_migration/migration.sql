-- AlterTable
ALTER TABLE "UserOrganization" ALTER COLUMN "org_document_url" DROP NOT NULL,
ALTER COLUMN "org_email" DROP NOT NULL,
ALTER COLUMN "org_name" DROP NOT NULL;
