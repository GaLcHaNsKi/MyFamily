/*
  Warnings:

  - You are about to drop the column `periodic` on the `Task` table. All the data in the column will be lost.
  - Made the column `isOlder` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "isOlder" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "periodic",
ADD COLUMN     "period" TEXT;
