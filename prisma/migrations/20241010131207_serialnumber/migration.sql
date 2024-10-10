/*
  Warnings:

  - Added the required column `serialNumber` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "serialNumber" VARCHAR(100) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
