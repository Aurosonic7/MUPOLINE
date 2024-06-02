/*
  Warnings:

  - You are about to drop the column `createat` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `updateat` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `createat` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `updateat` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `createat`,
    DROP COLUMN `updateat`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Worker` DROP COLUMN `createat`,
    DROP COLUMN `updateat`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
