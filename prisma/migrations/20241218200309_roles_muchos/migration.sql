-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_auth_usersId_fkey`;

-- AlterTable
ALTER TABLE `Role` MODIFY `auth_usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_auth_usersId_fkey` FOREIGN KEY (`auth_usersId`) REFERENCES `auth_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
