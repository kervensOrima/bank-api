/*
  Warnings:

  - You are about to alter the column `balance` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `interested_rate` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `over_draft` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `balance` DECIMAL NOT NULL DEFAULT 0.00,
    MODIFY `interested_rate` DECIMAL NULL DEFAULT 0.00,
    MODIFY `over_draft` DECIMAL NULL DEFAULT 0.00;
