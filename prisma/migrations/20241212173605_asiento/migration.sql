/*
  Warnings:

  - Added the required column `asiento` to the `Libro_Diario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Libro_Diario` ADD COLUMN `asiento` INTEGER NOT NULL;
