-- CreateTable
CREATE TABLE `Artwork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(120) NOT NULL,
    `audio` LONGBLOB NULL,
    `image` LONGBLOB NULL,
    `workerid` INTEGER NOT NULL,
    `createat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Worker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `createat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Worker_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_workerid_fkey` FOREIGN KEY (`workerid`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
