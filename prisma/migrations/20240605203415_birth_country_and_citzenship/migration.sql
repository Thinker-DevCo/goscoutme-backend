/*
  Warnings:

  - You are about to drop the column `citzenship` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `birth_country` on the `UserAthleteProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "citzenship";

-- AlterTable
ALTER TABLE "UserAthleteProfile" DROP COLUMN "birth_country";
