/*
  Warnings:

  - Added the required column `sport_attribute` to the `UserMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMedia" ADD COLUMN     "sport_attribute" INTEGER;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_sport_attribute_fkey" FOREIGN KEY ("sport_attribute") REFERENCES "SportsAttributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
