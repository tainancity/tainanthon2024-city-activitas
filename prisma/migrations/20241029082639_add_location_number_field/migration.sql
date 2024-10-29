/*
  Warnings:

  - Added the required column `location_number` to the `IdleAsset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IdleAsset" ADD COLUMN     "location_number" TEXT NOT NULL;
