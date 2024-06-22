-- CreateEnum
CREATE TYPE "tagOptions" AS ENUM ('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'GRAY', 'NONE');

-- CreateTable
CREATE TABLE "ScoutNotes" (
    "scout_id" INTEGER NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "scout_notes" TEXT,
    "tag" "tagOptions" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "ScoutNotes_pkey" PRIMARY KEY ("scout_id","athlete_id")
);
