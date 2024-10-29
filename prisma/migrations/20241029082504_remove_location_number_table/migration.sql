/*
  Warnings:

  - You are about to drop the column `location_number_id` on the `IdleAsset` table. All the data in the column will be lost.
  - You are about to drop the `LocationNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_location_number_id_fkey";

-- DropIndex
DROP INDEX "IdleAsset_location_number_id_key";

-- AlterTable
ALTER TABLE "IdleAsset" DROP COLUMN "location_number_id";

-- DropTable
DROP TABLE "LocationNumber";
