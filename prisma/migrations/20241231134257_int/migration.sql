/*
  Warnings:

  - You are about to drop the column `authKeySystemFoxPro` on the `auth_company` table. All the data in the column will be lost.
  - You are about to alter the column `authKeyCompany` on the `auth_company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `auth_company` DROP COLUMN `authKeySystemFoxPro`,
    MODIFY `authKeyCompany` INTEGER NOT NULL;
