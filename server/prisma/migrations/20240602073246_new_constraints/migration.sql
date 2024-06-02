/*
  Warnings:

  - You are about to alter the column `title` on the `Artwork` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `Worker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Artwork` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `audio` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Worker` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;
