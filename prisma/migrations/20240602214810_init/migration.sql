-- CreateEnum
CREATE TYPE "UserSexOptions" AS ENUM ('NOT_SPECIEFIED', 'MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "NationalityOptions" AS ENUM ('NOT_SPECIEFIED', 'INDIAN', 'MOZAMBICAN', 'PORTUGUESE', 'ARGENTINIAN');

-- CreateEnum
CREATE TYPE "MediaOptions" AS ENUM ('VIDEO', 'IMAGE');

-- CreateEnum
CREATE TYPE "HeightOptions" AS ENUM ('CM', 'FT');

-- CreateEnum
CREATE TYPE "WeightOptions" AS ENUM ('KG', 'LB');

-- CreateEnum
CREATE TYPE "AthleteStatusOptions" AS ENUM ('NOT_SPECIEFIED', 'PROFESSIONAL', 'AMATEUR');

-- CreateEnum
CREATE TYPE "UserAccountStatusOptions" AS ENUM ('ACTIVE', 'INATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "UserSexOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "birt_date" TIMESTAMP(3) NOT NULL,
    "account_status" "UserAccountStatusOptions" NOT NULL DEFAULT 'INATIVE',
    "nationality" "NationalityOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "citzenship" "NationalityOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "sport_id" INTEGER,
    "phone" TEXT,
    "mobile" TEXT,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAthleteProfile" (
    "id" SERIAL NOT NULL,
    "birth_country" "NationalityOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "citzenship" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "height_metric" "HeightOptions" NOT NULL DEFAULT 'CM',
    "weight" DOUBLE PRECISION NOT NULL,
    "weight_metric" "WeightOptions" NOT NULL DEFAULT 'KG',
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "status" "AthleteStatusOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "leagues_played" TEXT,

    CONSTRAINT "UserAthleteProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserScoutProfile" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "affiliations" TEXT[],

    CONSTRAINT "UserScoutProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGuardian" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "concent_form" TEXT NOT NULL,

    CONSTRAINT "UserGuardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sports" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportsAttributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sport_id" INTEGER NOT NULL,

    CONSTRAINT "SportsAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOrganization" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "mobile" TEXT,
    "document_url" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedia" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MediaOptions" NOT NULL,
    "media_url" TEXT NOT NULL,

    CONSTRAINT "UserMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAppointments" (
    "athlete_id" INTEGER NOT NULL,
    "scout_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "scheduled" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAppointments_pkey" PRIMARY KEY ("athlete_id","scout_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_public_id_key" ON "User"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sports_public_id_key" ON "Sports"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_public_id_key" ON "UserOrganization"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_profile_id_key" ON "UserOrganization"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMedia_public_id_key" ON "UserMedia"("public_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGuardian" ADD CONSTRAINT "UserGuardian_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportsAttributes" ADD CONSTRAINT "SportsAttributes_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "UserScoutProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppointments" ADD CONSTRAINT "UserAppointments_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppointments" ADD CONSTRAINT "UserAppointments_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "UserScoutProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
