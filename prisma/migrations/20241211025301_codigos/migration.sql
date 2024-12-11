-- DropForeignKey
ALTER TABLE `Cuenta_contables` DROP FOREIGN KEY `Cuenta_contables_Cuenta_contable_tipoId_fkey`;

-- AddForeignKey
ALTER TABLE `Cuenta_contables` ADD CONSTRAINT `Cuenta_contables_Cuenta_contable_tipoId_fkey` FOREIGN KEY (`Cuenta_contable_tipoId`) REFERENCES `Cuenta_contables_tipo`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;
