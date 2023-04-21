-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('AREA', 'LENGTH', 'MASS', 'VOLUME', 'QUANTITY');

-- CreateTable
CREATE TABLE "MeasurementUnit" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MeasurementType" NOT NULL,

    CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementUnit_code_key" ON "MeasurementUnit"("code");
