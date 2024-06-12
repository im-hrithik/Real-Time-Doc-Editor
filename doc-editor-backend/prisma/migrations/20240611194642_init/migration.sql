/*
  Warnings:

  - You are about to drop the column `userId` on the `document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_userId_fkey`;

-- AlterTable
ALTER TABLE `document` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `Document_title_key` ON `Document`(`title`);
