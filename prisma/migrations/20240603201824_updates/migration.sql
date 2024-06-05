/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `UserAthleteProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `UserScoutProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `UserAthleteProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `UserScoutProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sport_id_fkey";

-- AlterTable
ALTER TABLE "UserAthleteProfile" ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserScoutProfile" ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "sex" "UserSexOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "birt_date" TIMESTAMP(3) NOT NULL,
    "account_status" "UserAccountStatusOptions" NOT NULL DEFAULT 'INATIVE',
    "nationality" "CountriesOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "citzenship" "CountriesOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "sport_id" INTEGER,
    "phone" TEXT,
    "mobile" TEXT,
    "address" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_public_id_key" ON "Profiles"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAthleteProfile_profile_id_key" ON "UserAthleteProfile"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserScoutProfile_profile_id_key" ON "UserScoutProfile"("profile_id");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAthleteProfile" ADD CONSTRAINT "UserAthleteProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoutProfile" ADD CONSTRAINT "UserScoutProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
