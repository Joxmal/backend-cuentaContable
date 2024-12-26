-- CreateTable
CREATE TABLE `Cierre_Anual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `dateInicio` DATETIME(3) NOT NULL,
    `dateFinal` DATETIME(3) NOT NULL,
    `ganancias` DECIMAL(10, 4) NOT NULL DEFAULT 0,
    `perdidas` DECIMAL(10, 4) NOT NULL DEFAULT 0,

    UNIQUE INDEX `Cierre_Anual_companyId_periodo_key`(`companyId`, `periodo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cierre_Anual` ADD CONSTRAINT `Cierre_Anual_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
