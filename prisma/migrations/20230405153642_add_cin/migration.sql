/*
  Warnings:

  - You are about to alter the column `balance` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `interested_rate` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `over_draft` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - A unique constraint covering the columns `[cin]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cin` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `balance` DECIMAL NOT NULL DEFAULT 0.00,
    MODIFY `interested_rate` DECIMAL NOT NULL,
    MODIFY `over_draft` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `owner` ADD COLUMN `cin` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Owner_cin_key` ON `Owner`(`cin`);
