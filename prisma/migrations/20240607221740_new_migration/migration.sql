/*
  Warnings:

  - You are about to drop the column `document_url` on the `UserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `UserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `UserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `UserOrganization` table. All the data in the column will be lost.
  - Added the required column `org_document_url` to the `UserOrganization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_email` to the `UserOrganization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_name` to the `UserOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserOrganization_public_id_key";

-- AlterTable
CREATE SEQUENCE usercareerstatistics_id_seq;
ALTER TABLE "UserCareerStatistics" ALTER COLUMN "id" SET DEFAULT nextval('usercareerstatistics_id_seq');
ALTER SEQUENCE usercareerstatistics_id_seq OWNED BY "UserCareerStatistics"."id";

-- AlterTable
ALTER TABLE "UserOrganization" DROP COLUMN "document_url",
DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "public_id",
ADD COLUMN     "org_document_url" TEXT NOT NULL,
ADD COLUMN     "org_email" TEXT NOT NULL,
ADD COLUMN     "org_mobile" TEXT,
ADD COLUMN     "org_name" TEXT NOT NULL,
ADD COLUMN     "org_phone" TEXT;
