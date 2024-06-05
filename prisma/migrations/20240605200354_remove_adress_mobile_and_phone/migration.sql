/*
  Warnings:

  - You are about to drop the column `address` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserAthleteProfile` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `UserScoutProfile` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `UserScoutProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserScoutProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAthleteProfile" DROP COLUMN "address",
DROP COLUMN "mobile",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "UserScoutProfile" DROP COLUMN "address",
DROP COLUMN "mobile",
DROP COLUMN "phone";
