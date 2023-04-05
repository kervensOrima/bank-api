/*
  Warnings:

  - You are about to drop the column `current_account_pk` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `saving_account_pk` on the `account` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `currentaccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `savingaccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `interested_rate` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `over_draft` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `currentaccount` DROP FOREIGN KEY `CurrentAccount_account_pk_fkey`;

-- DropForeignKey
ALTER TABLE `savingaccount` DROP FOREIGN KEY `SavingAccount_account_pk_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `current_account_pk`,
    DROP COLUMN `saving_account_pk`,
    ADD COLUMN `account_type` ENUM('SAVING', 'CURRENT') NOT NULL DEFAULT 'CURRENT',
    ADD COLUMN `interested_rate` DECIMAL NOT NULL,
    ADD COLUMN `over_draft` DECIMAL NOT NULL,
    MODIFY `balance` DECIMAL NOT NULL DEFAULT 0.00;

-- DropTable
DROP TABLE `currentaccount`;

-- DropTable
DROP TABLE `savingaccount`;
