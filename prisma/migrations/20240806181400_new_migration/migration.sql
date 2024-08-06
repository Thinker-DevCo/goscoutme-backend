/*
  Warnings:

  - Added the required column `public_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "public_id" INTEGER NOT NULL;
