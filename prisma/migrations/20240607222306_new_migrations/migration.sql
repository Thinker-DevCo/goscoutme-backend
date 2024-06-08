/*
  Warnings:

  - You are about to drop the column `affiliations` on the `UserScoutProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "affiliations" TEXT;

-- AlterTable
ALTER TABLE "UserScoutProfile" DROP COLUMN "affiliations";
