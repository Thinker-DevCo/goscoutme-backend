/*
  Warnings:

  - The primary key for the `UserAppointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `concent_form` on the `UserGuardian` table. All the data in the column will be lost.
  - Added the required column `consent_form` to the `UserGuardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAppointments" DROP CONSTRAINT "UserAppointments_pkey",
ADD CONSTRAINT "UserAppointments_pkey" PRIMARY KEY ("athlete_id", "scout_id", "scheduled");

-- AlterTable
ALTER TABLE "UserAthleteProfile" ADD COLUMN     "sport_position_id" INTEGER;

-- AlterTable
ALTER TABLE "UserGuardian" DROP COLUMN "concent_form",
ADD COLUMN     "consent_form" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserSportsAttributes" (
    "athlete_id" INTEGER NOT NULL,
    "sport_attributes_id" INTEGER NOT NULL,

    CONSTRAINT "UserSportsAttributes_pkey" PRIMARY KEY ("athlete_id","sport_attributes_id")
);

-- CreateTable
CREATE TABLE "SportPosition" (
    "id" INTEGER NOT NULL,
    "sport_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SportPosition_id_key" ON "SportPosition"("id");

-- AddForeignKey
ALTER TABLE "UserAthleteProfile" ADD CONSTRAINT "UserAthleteProfile_sport_position_id_fkey" FOREIGN KEY ("sport_position_id") REFERENCES "SportPosition"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSportsAttributes" ADD CONSTRAINT "UserSportsAttributes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSportsAttributes" ADD CONSTRAINT "UserSportsAttributes_sport_attributes_id_fkey" FOREIGN KEY ("sport_attributes_id") REFERENCES "SportsAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
