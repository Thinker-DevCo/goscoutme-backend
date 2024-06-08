/*
  Warnings:

  - You are about to drop the column `organization_id` on the `UserScoutProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_profile_id_fkey";

-- AlterTable
ALTER TABLE "UserScoutProfile" DROP COLUMN "organization_id";

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
