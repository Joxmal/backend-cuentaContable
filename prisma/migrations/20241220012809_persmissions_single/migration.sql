/*
  Warnings:

  - You are about to drop the column `companyId` on the `Groups_company_plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permissionsId,nombre]` on the table `Groups_company_plan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Groups_company_plan` DROP FOREIGN KEY `Groups_company_plan_companyId_fkey`;

-- DropIndex
DROP INDEX `Groups_company_plan_companyId_nombre_key` ON `Groups_company_plan`;

-- AlterTable
ALTER TABLE `Groups_company_plan` DROP COLUMN `companyId`;

-- AlterTable
ALTER TABLE `auth_company` ADD COLUMN `groups_company_planId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Groups_company_plan_permissionsId_nombre_key` ON `Groups_company_plan`(`permissionsId`, `nombre`);

-- AddForeignKey
ALTER TABLE `auth_company` ADD CONSTRAINT `auth_company_groups_company_planId_fkey` FOREIGN KEY (`groups_company_planId`) REFERENCES `Groups_company_plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
