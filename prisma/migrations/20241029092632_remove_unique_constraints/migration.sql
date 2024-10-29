-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_authority_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_district_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_holding_type_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_land_type_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_land_use_type_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_location_id_fkey";

-- DropForeignKey
ALTER TABLE "IdleAsset" DROP CONSTRAINT "IdleAsset_use_partition_id_fkey";

-- DropIndex
DROP INDEX "IdleAsset_authority_id_key";

-- DropIndex
DROP INDEX "IdleAsset_district_id_key";

-- DropIndex
DROP INDEX "IdleAsset_holding_type_id_key";

-- DropIndex
DROP INDEX "IdleAsset_land_type_id_key";

-- DropIndex
DROP INDEX "IdleAsset_land_use_type_id_key";

-- DropIndex
DROP INDEX "IdleAsset_location_id_key";

-- DropIndex
DROP INDEX "IdleAsset_use_partition_id_key";

-- AlterTable
ALTER TABLE "Authority" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "District" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "HoldingType" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "LandType" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "LandUseType" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "idleAssetId" BIGINT;

-- AlterTable
ALTER TABLE "UserPartition" ADD COLUMN     "idleAssetId" BIGINT;
