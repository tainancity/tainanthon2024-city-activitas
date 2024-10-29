-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_holding_type_id_fkey";

-- AlterTable
ALTER TABLE "IdleAsset" ALTER COLUMN "holding_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_holding_type_id_fkey" FOREIGN KEY ("holding_type_id") REFERENCES "HoldingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
