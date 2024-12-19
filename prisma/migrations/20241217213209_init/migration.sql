-- CreateTable
CREATE TABLE `auth_company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authKeyCompany` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `auth_company_authKeyCompany_key`(`authKeyCompany`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Data_Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCompany` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `companyId` INTEGER NULL,

    UNIQUE INDEX `Data_Company_companyId_key`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `second_name` VARCHAR(191) NULL,
    `companyId` INTEGER NULL,
    `primaryRole` ENUM('user', 'admin', 'superAdmin', 'root') NOT NULL DEFAULT 'user',
    `last_login` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `auth_users_companyId_username_key`(`companyId`, `username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `permissionsId` INTEGER NULL,
    `auth_usersId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `companyId` INTEGER NOT NULL,

    UNIQUE INDEX `Role_permissionsId_key`(`permissionsId`),
    UNIQUE INDEX `Role_auth_usersId_key`(`auth_usersId`),
    UNIQUE INDEX `Role_companyId_name_key`(`companyId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libro_mayor` BOOLEAN NOT NULL DEFAULT false,
    `libro_diario_` BOOLEAN NOT NULL DEFAULT false,
    `bancos` BOOLEAN NOT NULL DEFAULT false,
    `caja` BOOLEAN NOT NULL DEFAULT false,
    `balance_comprobacion` BOOLEAN NOT NULL DEFAULT false,
    `est_financieros` BOOLEAN NOT NULL DEFAULT false,
    `asientos_contables` BOOLEAN NOT NULL DEFAULT false,
    `export_data` BOOLEAN NOT NULL DEFAULT false,
    `import_data` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups_company_plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `permissionsId` INTEGER NOT NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Groups_company_plan_permissionsId_key`(`permissionsId`),
    UNIQUE INDEX `Groups_company_plan_companyId_key`(`companyId`),
    UNIQUE INDEX `Groups_company_plan_companyId_nombre_key`(`companyId`, `nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuenta_contables_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `naturaleza` BOOLEAN NULL DEFAULT true,
    `codigo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cuenta_contables_tipo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuenta_contables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `Cuenta_contable_tipoId` INTEGER NOT NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cuenta_contables_companyId_codigo_key`(`companyId`, `codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Libro_Diario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asiento` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `cuentaId` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `debe` DOUBLE NOT NULL,
    `haber` DOUBLE NOT NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_time` DATETIME(3) NOT NULL,
    `object_action` JSON NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Data_Company` ADD CONSTRAINT `Data_Company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users` ADD CONSTRAINT `auth_users_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_permissionsId_fkey` FOREIGN KEY (`permissionsId`) REFERENCES `Permissions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_auth_usersId_fkey` FOREIGN KEY (`auth_usersId`) REFERENCES `auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Groups_company_plan` ADD CONSTRAINT `Groups_company_plan_permissionsId_fkey` FOREIGN KEY (`permissionsId`) REFERENCES `Permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Groups_company_plan` ADD CONSTRAINT `Groups_company_plan_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuenta_contables` ADD CONSTRAINT `Cuenta_contables_Cuenta_contable_tipoId_fkey` FOREIGN KEY (`Cuenta_contable_tipoId`) REFERENCES `Cuenta_contables_tipo`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuenta_contables` ADD CONSTRAINT `Cuenta_contables_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Libro_Diario` ADD CONSTRAINT `Libro_Diario_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_logs` ADD CONSTRAINT `Admin_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `auth_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_logs` ADD CONSTRAINT `Admin_logs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `auth_company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
