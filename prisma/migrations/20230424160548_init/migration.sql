-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('AREA', 'LENGTH', 'MASS', 'VOLUME', 'QUANTITY');

-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('USER_SELF_READ', 'USER_SELF_UPDATE', 'USER_SELF_DELETE', 'USER_READ', 'USER_CREATE', 'USER_UPDATE', 'USER_DELETE', 'CUSTOMER_READ', 'CUSTOMER_CREATE', 'CUSTOMER_UPDATE', 'CUSTOMER_DELETE', 'PRODUCT_READ', 'PRODUCT_CREATE', 'PRODUCT_UPDATE', 'PRODUCT_DELETE');

-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Currency" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "MeasurementUnit" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MeasurementType" NOT NULL,

    CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Event" (
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissionOnUser" (
    "userId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "permission" "UserPermission" NOT NULL,

    CONSTRAINT "UserPermissionOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "guest" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "lastName" TEXT,
    "name" TEXT,
    "optIn" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerNotes" (
    "customerId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "CustomerNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "note" TEXT,
    "phone" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerCategory" (
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CustomerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToCustomerCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementUnit_code_key" ON "MeasurementUnit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissionOnUser_userId_permission_key" ON "UserPermissionOnUser"("userId", "permission");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToCustomerCategory_AB_unique" ON "_CustomerToCustomerCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToCustomerCategory_B_index" ON "_CustomerToCustomerCategory"("B");

-- AddForeignKey
ALTER TABLE "UserPermissionOnUser" ADD CONSTRAINT "UserPermissionOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerNotes" ADD CONSTRAINT "CustomerNotes_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToCustomerCategory" ADD CONSTRAINT "_CustomerToCustomerCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToCustomerCategory" ADD CONSTRAINT "_CustomerToCustomerCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "CustomerCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
