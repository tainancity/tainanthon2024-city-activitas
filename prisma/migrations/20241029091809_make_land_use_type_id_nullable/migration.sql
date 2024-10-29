-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_land_use_type_id_fkey";

-- AlterTable
ALTER TABLE "IdleAsset" ALTER COLUMN "land_use_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_land_use_type_id_fkey" FOREIGN KEY ("land_use_type_id") REFERENCES "LandUseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
