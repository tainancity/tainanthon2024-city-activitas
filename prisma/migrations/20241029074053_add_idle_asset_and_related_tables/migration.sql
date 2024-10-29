-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IDLE', 'PARTIAL_IDLE');

-- CreateTable
CREATE TABLE "Authority" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationNumber" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandType" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoldingType" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HoldingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPartition" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPartition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandUseType" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandUseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdleAsset" (
    "id" BIGSERIAL NOT NULL,
    "serial_number" TEXT NOT NULL,
    "name" TEXT,
    "authority_id" BIGINT NOT NULL,
    "district_id" BIGINT NOT NULL,
    "location_id" BIGINT NOT NULL,
    "location_number_id" BIGINT NOT NULL,
    "land_type_id" BIGINT NOT NULL,
    "area" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "holding_type_Id" BIGINT NOT NULL,
    "use_partition_id" BIGINT NOT NULL,
    "land_use_type_id" BIGINT NOT NULL,
    "status" "Status" NOT NULL,
    "vacancy_rate" DECIMAL(65,30) NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdleAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_authority_id_key" ON "IdleAsset"("authority_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_district_id_key" ON "IdleAsset"("district_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_location_id_key" ON "IdleAsset"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_location_number_id_key" ON "IdleAsset"("location_number_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_land_type_id_key" ON "IdleAsset"("land_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_holding_type_Id_key" ON "IdleAsset"("holding_type_Id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_use_partition_id_key" ON "IdleAsset"("use_partition_id");

-- CreateIndex
CREATE UNIQUE INDEX "IdleAsset_land_use_type_id_key" ON "IdleAsset"("land_use_type_id");

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_authority_id_fkey" FOREIGN KEY ("authority_id") REFERENCES "Authority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_location_number_id_fkey" FOREIGN KEY ("location_number_id") REFERENCES "LocationNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_land_type_id_fkey" FOREIGN KEY ("land_type_id") REFERENCES "LandType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_holding_type_Id_fkey" FOREIGN KEY ("holding_type_Id") REFERENCES "HoldingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_use_partition_id_fkey" FOREIGN KEY ("use_partition_id") REFERENCES "UserPartition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleAsset" ADD CONSTRAINT "IdleAsset_land_use_type_id_fkey" FOREIGN KEY ("land_use_type_id") REFERENCES "LandUseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
