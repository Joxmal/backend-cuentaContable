/*
  Warnings:

  - You are about to drop the column `auth_usersId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_auth_usersId_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `auth_usersId`;

-- AlterTable
ALTER TABLE `auth_users` ADD COLUMN `roleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `auth_users` ADD CONSTRAINT `auth_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
