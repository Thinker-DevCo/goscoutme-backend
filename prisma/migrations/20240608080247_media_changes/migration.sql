/*
  Warnings:

  - You are about to drop the column `public_id` on the `UserMedia` table. All the data in the column will be lost.
  - Added the required column `athlete_id` to the `UserMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserMedia_public_id_key";

-- AlterTable
ALTER TABLE "UserMedia" DROP COLUMN "public_id",
ADD COLUMN     "athlete_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
