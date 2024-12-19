/*
  Warnings:

  - Made the column `auth_usersId` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_auth_usersId_fkey`;

-- AlterTable
ALTER TABLE `Role` MODIFY `auth_usersId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_auth_usersId_fkey` FOREIGN KEY (`auth_usersId`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
