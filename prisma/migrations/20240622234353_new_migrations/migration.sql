/*
  Warnings:

  - You are about to drop the column `tag` on the `ScoutNotes` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "tagOptions" ADD VALUE 'WHITE';

-- AlterTable
ALTER TABLE "ScoutNotes" DROP COLUMN "tag",
ADD COLUMN     "color_tag" "tagOptions" NOT NULL DEFAULT 'NONE';
