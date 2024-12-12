-- DropIndex
DROP INDEX `Libro_Diario_cuentaId_fkey` ON `Libro_Diario`;

-- AddForeignKey
ALTER TABLE `Libro_Diario` ADD CONSTRAINT `Libro_Diario_cuentaId_fkey` FOREIGN KEY (`cuentaId`) REFERENCES `Cuenta_contables`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
