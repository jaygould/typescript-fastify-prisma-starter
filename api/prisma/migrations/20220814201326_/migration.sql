/*
  Warnings:

  - The `activityType` column on the `LoginActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LoginActivity" DROP COLUMN "activityType",
ADD COLUMN     "activityType" "ActivityType";
