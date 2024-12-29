-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_companyId_fkey`;

-- AlterTable
ALTER TABLE `Role` MODIFY `is_active` BOOLEAN NULL DEFAULT true,
    MODIFY `companyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
