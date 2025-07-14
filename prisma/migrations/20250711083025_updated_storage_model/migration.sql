/*
  Warnings:

  - Added the required column `type` to the `Storage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('LOCAL', 'MEGA', 'CLOUDINARY', 'BACKBLAZE_B2', 'DROPBOX');

-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "config" JSONB,
ADD COLUMN     "type" "StorageType" NOT NULL;
