/*
  Warnings:

  - You are about to alter the column `debe` on the `Libro_Diario` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
  - You are about to alter the column `haber` on the `Libro_Diario` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Libro_Diario` MODIFY `debe` DOUBLE NOT NULL,
    MODIFY `haber` DOUBLE NOT NULL;
