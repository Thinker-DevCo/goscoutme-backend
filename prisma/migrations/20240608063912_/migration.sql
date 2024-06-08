/*
  Warnings:

  - The `citzenship` column on the `UserAthleteProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserAthleteProfile" DROP COLUMN "citzenship",
ADD COLUMN     "citzenship" "CountriesOptions"[];

-- AddForeignKey
ALTER TABLE "SportPosition" ADD CONSTRAINT "SportPosition_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
