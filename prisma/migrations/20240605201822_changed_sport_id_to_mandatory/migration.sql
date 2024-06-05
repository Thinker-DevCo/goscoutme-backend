/*
  Warnings:

  - Made the column `sport_id` on table `Profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_sport_id_fkey";

-- AlterTable
ALTER TABLE "Profiles" ALTER COLUMN "sport_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
