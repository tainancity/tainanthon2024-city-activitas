/*
  Warnings:

  - You are about to drop the column `holding_type_Id` on the `IdleAsset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[holding_type_id]` on the table `IdleAsset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `holding_type_id` to the `IdleAsset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_holding_type_Id_fkey";

-- DropIndex
DROP INDEX "IdleAsset_holding_type_Id_key";

-- AlterTable
ALTER TABLE "IdleAsset" DROP COLUMN "holding_type_Id",
ADD COLUMN     "holding_type_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_holding_type_id_key" ON "IdleAsset"("holding_type_id");

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_holding_type_id_fkey" FOREIGN KEY ("holding_type_id") REFERENCES "HoldingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
