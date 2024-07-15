/*
  Warnings:

  - You are about to drop the column `sport_attribute` on the `UserMedia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserMedia" DROP CONSTRAINT "UserMedia_sport_attribute_fkey";

-- AlterTable
ALTER TABLE "UserMedia" DROP COLUMN "sport_attribute",
ADD COLUMN     "sport_attribute_id" INTEGER;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_sport_attribute_id_fkey" FOREIGN KEY ("sport_attribute_id") REFERENCES "SportsAttributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
