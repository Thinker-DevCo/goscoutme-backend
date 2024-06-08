-- CreateEnum
CREATE TYPE "UserSexOptions" AS ENUM ('NOT_SPECIEFIED', 'MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CountriesOptions" AS ENUM ('NOT_SPECIEFIED', 'AFGHANISTAN', 'ALBANIA', 'ALGERIA', 'ANDORRA', 'ANGOLA', 'ANTIGUA_AND_BARBUDA', 'ARGENTINA', 'ARMENIA', 'AUSTRALIA', 'AUSTRIA', 'AZERBAIJAN', 'BAHAMAS', 'BAHRAIN', 'BANGLADESH', 'BARBADOS', 'BELARUS', 'BELGIUM', 'BELIZE', 'BENIN', 'BHUTAN', 'BOLIVIA', 'BOSNIA_AND_HERZEGOVINA', 'BOTSWANA', 'BRAZIL', 'BRUNEI', 'BULGARIA', 'BURKINA_FASO', 'BURUNDI', 'CABO_VERDE', 'CAMBODIA', 'CAMEROON', 'CANADA', 'CENTRAL_AFRICAN_REPUBLIC', 'CHAD', 'CHILE', 'CHINA', 'COLOMBIA', 'COMOROS', 'CONGO_DEMOCRATIC_REPUBLIC', 'CONGO_REPUBLIC', 'COSTA_RICA', 'CROATIA', 'CUBA', 'CYPRUS', 'CZECH_REPUBLIC', 'DENMARK', 'DJIBOUTI', 'DOMINICA', 'DOMINICAN_REPUBLIC', 'EAST_TIMOR', 'ECUADOR', 'EGYPT', 'EL_SALVADOR', 'EQUATORIAL_GUINEA', 'ERITREA', 'ESTONIA', 'ESWATINI', 'ETHIOPIA', 'FIJI', 'FINLAND', 'FRANCE', 'GABON', 'GAMBIA', 'GEORGIA', 'GERMANY', 'GHANA', 'GREECE', 'GRENADA', 'GUATEMALA', 'GUINEA', 'GUINEA_BISSAU', 'GUYANA', 'HAITI', 'HONDURAS', 'HUNGARY', 'ICELAND', 'INDIA', 'INDONESIA', 'IRAN', 'IRAQ', 'IRELAND', 'ISRAEL', 'ITALY', 'IVORY_COAST', 'JAMAICA', 'JAPAN', 'JORDAN', 'KAZAKHSTAN', 'KENYA', 'KIRIBATI', 'KOSOVO', 'KUWAIT', 'KYRGYZSTAN', 'LAOS', 'LATVIA', 'LEBANON', 'LESOTHO', 'LIBERIA', 'LIBYA', 'LIECHTENSTEIN', 'LITHUANIA', 'LUXEMBOURG', 'MADAGASCAR', 'MALAWI', 'MALAYSIA', 'MALDIVES', 'MALI', 'MALTA', 'MARSHALL_ISLANDS', 'MAURITANIA', 'MAURITIUS', 'MEXICO', 'MICRONESIA', 'MOLDOVA', 'MONACO', 'MONGOLIA', 'MONTENEGRO', 'MOROCCO', 'MOZAMBIQUE', 'MYANMAR', 'NAMIBIA', 'NAURU', 'NEPAL', 'NETHERLANDS', 'NEW_ZEALAND', 'NICARAGUA', 'NIGER', 'NIGERIA', 'NORTH_KOREA', 'NORTH_MACEDONIA', 'NORWAY', 'OMAN', 'PAKISTAN', 'PALAU', 'PALESTINE', 'PANAMA', 'PAPUA_NEW_GUINEA', 'PARAGUAY', 'PERU', 'PHILIPPINES', 'POLAND', 'PORTUGAL', 'QATAR', 'ROMANIA', 'RUSSIA', 'RWANDA', 'SAINT_KITTS_AND_NEVIS', 'SAINT_LUCIA', 'SAINT_VINCENT_AND_THE_GRENADINES', 'SAMOA', 'SAN_MARINO', 'SAO_TOME_AND_PRINCIPE', 'SAUDI_ARABIA', 'SENEGAL', 'SERBIA', 'SEYCHELLES', 'SIERRA_LEONE', 'SINGAPORE', 'SLOVAKIA', 'SLOVENIA', 'SOLOMON_ISLANDS', 'SOMALIA', 'SOUTH_AFRICA', 'SOUTH_KOREA', 'SOUTH_SUDAN', 'SPAIN', 'SRI_LANKA', 'SUDAN', 'SURINAME', 'SWEDEN', 'SWITZERLAND', 'SYRIA', 'TAIWAN', 'TAJIKISTAN', 'TANZANIA', 'THAILAND', 'TOGO', 'TONGA', 'TRINIDAD_AND_TOBAGO', 'TUNISIA', 'TURKEY', 'TURKMENISTAN', 'TUVALU', 'UGANDA', 'UKRAINE', 'UNITED_ARAB_EMIRATES', 'UNITED_KINGDOM', 'UNITED_STATES', 'URUGUAY', 'UZBEKISTAN', 'VANUATU', 'VATICAN_CITY', 'VENEZUELA', 'VIETNAM', 'YEMEN', 'ZAMBIA', 'ZIMBABWE');

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
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sex" "UserSexOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "birth_date" TIMESTAMP(3) NOT NULL,
    "account_status" "UserAccountStatusOptions" NOT NULL DEFAULT 'INATIVE',
    "nationality" "CountriesOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "sport_id" INTEGER NOT NULL,
    "phone" TEXT,
    "mobile" TEXT,
    "affiliations" TEXT,
    "address" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAthleteProfile" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "citzenship" "CountriesOptions"[] DEFAULT ARRAY['NOT_SPECIEFIED']::"CountriesOptions"[],
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "height_metric" "HeightOptions" NOT NULL DEFAULT 'CM',
    "weight" DOUBLE PRECISION NOT NULL,
    "weight_metric" "WeightOptions" NOT NULL DEFAULT 'KG',
    "status" "AthleteStatusOptions" NOT NULL DEFAULT 'NOT_SPECIEFIED',
    "leagues_played" TEXT,
    "sport_position_id" INTEGER,
    "league_played" TEXT,

    CONSTRAINT "UserAthleteProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCareerStatistics" (
    "id" SERIAL NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "game_appearances" INTEGER NOT NULL DEFAULT 0,
    "minutes_played" INTEGER NOT NULL DEFAULT 0,
    "game_started" INTEGER NOT NULL DEFAULT 0,
    "field_goals" INTEGER NOT NULL DEFAULT 0,
    "attribute_update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCareerStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSportsAttributes" (
    "athlete_id" INTEGER NOT NULL,
    "sport_attributes_id" INTEGER NOT NULL,

    CONSTRAINT "UserSportsAttributes_pkey" PRIMARY KEY ("athlete_id","sport_attributes_id")
);

-- CreateTable
CREATE TABLE "SportPosition" (
    "id" INTEGER NOT NULL,
    "sport_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserScoutProfile" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "UserScoutProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGuardian" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "consent_form" TEXT NOT NULL,

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
    "org_name" TEXT,
    "org_email" TEXT,
    "org_phone" TEXT,
    "org_mobile" TEXT,
    "org_document_url" TEXT,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedia" (
    "id" SERIAL NOT NULL,
    "athlete_id" INTEGER NOT NULL,
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

    CONSTRAINT "UserAppointments_pkey" PRIMARY KEY ("athlete_id","scout_id","scheduled")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_public_id_key" ON "Profiles"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAthleteProfile_profile_id_key" ON "UserAthleteProfile"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCareerStatistics_athlete_id_key" ON "UserCareerStatistics"("athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "SportPosition_id_key" ON "SportPosition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserScoutProfile_profile_id_key" ON "UserScoutProfile"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sports_public_id_key" ON "Sports"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_profile_id_key" ON "UserOrganization"("profile_id");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAthleteProfile" ADD CONSTRAINT "UserAthleteProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAthleteProfile" ADD CONSTRAINT "UserAthleteProfile_sport_position_id_fkey" FOREIGN KEY ("sport_position_id") REFERENCES "SportPosition"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareerStatistics" ADD CONSTRAINT "UserCareerStatistics_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSportsAttributes" ADD CONSTRAINT "UserSportsAttributes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSportsAttributes" ADD CONSTRAINT "UserSportsAttributes_sport_attributes_id_fkey" FOREIGN KEY ("sport_attributes_id") REFERENCES "SportsAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPosition" ADD CONSTRAINT "SportPosition_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoutProfile" ADD CONSTRAINT "UserScoutProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGuardian" ADD CONSTRAINT "UserGuardian_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportsAttributes" ADD CONSTRAINT "SportsAttributes_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedia" ADD CONSTRAINT "UserMedia_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppointments" ADD CONSTRAINT "UserAppointments_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppointments" ADD CONSTRAINT "UserAppointments_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "UserScoutProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
