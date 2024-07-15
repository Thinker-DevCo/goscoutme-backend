-- AlterTable
ALTER TABLE "UserMedia" ADD COLUMN     "sport_attribute" INTEGER;

ALTER TABLE "UserMedia" ALTER COLUMN "sport_attribute" DROP NOT NULL;
