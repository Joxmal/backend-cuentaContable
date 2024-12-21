/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Groups_company_plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Groups_company_plan_nombre_key` ON `Groups_company_plan`(`nombre`);
