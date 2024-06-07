/*
  Warnings:

  - You are about to drop the column `field_goals` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `game_appearances` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `game_started` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `minutes_played` on the `UserAthleteProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAthleteProfile" DROP COLUMN "field_goals",
DROP COLUMN "game_appearances",
DROP COLUMN "game_started",
DROP COLUMN "minutes_played",
ADD COLUMN     "league_played" TEXT;

-- CreateTable
CREATE TABLE "UserCareerStatistics" (
    "id" INTEGER NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "game_appearances" INTEGER NOT NULL DEFAULT 0,
    "minutes_played" INTEGER NOT NULL DEFAULT 0,
    "game_started" INTEGER NOT NULL DEFAULT 0,
    "field_goals" INTEGER NOT NULL DEFAULT 0,
    "attribute_update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCareerStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCareerStatistics_athlete_id_key" ON "UserCareerStatistics"("athlete_id");

-- AddForeignKey
ALTER TABLE "UserCareerStatistics" ADD CONSTRAINT "UserCareerStatistics_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
