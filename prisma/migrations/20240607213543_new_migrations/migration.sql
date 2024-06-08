-- AlterTable
ALTER TABLE "UserAthleteProfile" ADD COLUMN     "field_goals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "game_appearances" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "game_started" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minutes_played" INTEGER NOT NULL DEFAULT 0;
