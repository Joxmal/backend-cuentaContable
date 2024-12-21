/*
  Warnings:

  - You are about to drop the column `asientos_contables` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `bancos` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `caja` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `libro_diario_` on the `Permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Permissions` DROP COLUMN `asientos_contables`,
    DROP COLUMN `bancos`,
    DROP COLUMN `caja`,
    DROP COLUMN `libro_diario_`,
    ADD COLUMN `libro_diario` BOOLEAN NOT NULL DEFAULT false;
