/*
  Warnings:

  - You are about to drop the column `age` on the `Profiles` table. All the data in the column will be lost.
  - Added the required column `age` to the `UserAthleteProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "age";

-- AlterTable
ALTER TABLE "UserAthleteProfile" ADD COLUMN     "age" INTEGER NOT NULL;
