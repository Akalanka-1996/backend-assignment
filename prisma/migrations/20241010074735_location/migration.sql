-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "status" "LocationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
