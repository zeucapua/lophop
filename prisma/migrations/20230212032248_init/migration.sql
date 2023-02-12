/*
  Warnings:

  - You are about to drop the column `classId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_classId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "classId";
