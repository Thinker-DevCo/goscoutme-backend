/*
  Warnings:

  - You are about to drop the column `birt_date` on the `Profiles` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "birt_date",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;
