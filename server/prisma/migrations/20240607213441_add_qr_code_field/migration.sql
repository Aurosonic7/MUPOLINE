/*
  Warnings:

  - Made the column `QRCode` on table `Artwork` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Artwork` MODIFY `QRCode` VARCHAR(191) NOT NULL;
