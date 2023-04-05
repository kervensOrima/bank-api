-- CreateTable
CREATE TABLE `Owner` (
    `code` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,

    UNIQUE INDEX `Owner_email_key`(`email`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `balance` DECIMAL NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `status` ENUM('CREATED', 'ACTIVATED', 'SUSPEND') NOT NULL DEFAULT 'CREATED',
    `owner_code` VARCHAR(191) NOT NULL,
    `current_account_pk` INTEGER NOT NULL,
    `saving_account_pk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CurrentAccount` (
    `id` VARCHAR(191) NOT NULL,
    `over_draft` DECIMAL NOT NULL,
    `account_pk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CurrentAccount_account_pk_key`(`account_pk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavingAccount` (
    `id` VARCHAR(191) NOT NULL,
    `interested_rate` DECIMAL NOT NULL,
    `account_pk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SavingAccount_account_pk_key`(`account_pk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `type` ENUM('DEBIT', 'CREDIT', 'TRANSFERt') NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_owner_code_fkey` FOREIGN KEY (`owner_code`) REFERENCES `Owner`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurrentAccount` ADD CONSTRAINT `CurrentAccount_account_pk_fkey` FOREIGN KEY (`account_pk`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavingAccount` ADD CONSTRAINT `SavingAccount_account_pk_fkey` FOREIGN KEY (`account_pk`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operation` ADD CONSTRAINT `Operation_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
