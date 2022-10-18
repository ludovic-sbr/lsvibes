-- CreateTable
CREATE TABLE `bans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `license` VARCHAR(50) NULL,
    `discord` VARCHAR(50) NULL,
    `ip` VARCHAR(50) NULL,
    `reason` TEXT NULL,
    `expire` INTEGER NULL,
    `bannedby` VARCHAR(255) NOT NULL DEFAULT 'LeBanhammer',

    INDEX `discord`(`discord`),
    INDEX `ip`(`ip`),
    INDEX `license`(`license`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characters` (
    `id` INTEGER NOT NULL,
    `charid` INTEGER NULL,
    `name` VARCHAR(50) NULL,
    `firstname` VARCHAR(50) NULL,
    `birthdate` DATE NULL,
    `money` INTEGER NULL,
    `blackmoney` INTEGER NULL,
    `bank` INTEGER NULL,
    `coords` VARCHAR(100) NULL,
    `model` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gloveboxitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(255) NOT NULL,
    `items` LONGTEXT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`plate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `license` VARCHAR(255) NOT NULL,
    `permission` VARCHAR(255) NOT NULL,

    INDEX `license`(`license`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizenid` VARCHAR(50) NULL,
    `name` VARCHAR(50) NULL,
    `number` VARCHAR(50) NULL,
    `iban` VARCHAR(50) NOT NULL DEFAULT '0',

    INDEX `citizenid`(`citizenid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_outfits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizenid` VARCHAR(50) NULL,
    `outfitname` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NULL,
    `skin` TEXT NULL,
    `outfitId` VARCHAR(50) NOT NULL,

    INDEX `citizenid`(`citizenid`),
    INDEX `outfitId`(`outfitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license` VARCHAR(50) NULL,
    `citizenid` VARCHAR(50) NULL,
    `vehicle` VARCHAR(50) NULL,
    `hash` VARCHAR(50) NULL,
    `mods` LONGTEXT NULL,
    `plate` VARCHAR(50) NOT NULL,
    `fakeplate` VARCHAR(50) NULL,
    `garage` VARCHAR(50) NULL,
    `fuel` INTEGER NULL DEFAULT 100,
    `engine` FLOAT NULL DEFAULT 1000,
    `body` FLOAT NULL DEFAULT 1000,
    `state` INTEGER NULL DEFAULT 1,
    `depotprice` INTEGER NOT NULL DEFAULT 0,
    `drivingdistance` INTEGER NULL,
    `status` TEXT NULL,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `paymentamount` INTEGER NOT NULL DEFAULT 0,
    `paymentsleft` INTEGER NOT NULL DEFAULT 0,
    `financetime` INTEGER NOT NULL DEFAULT 0,

    INDEX `citizenid`(`citizenid`),
    INDEX `license`(`license`),
    INDEX `plate`(`plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizenid` VARCHAR(50) NOT NULL,
    `cid` INTEGER NULL,
    `license` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `money` TEXT NOT NULL,
    `charinfo` TEXT NULL,
    `job` TEXT NOT NULL,
    `gang` TEXT NULL,
    `position` TEXT NOT NULL,
    `metadata` TEXT NOT NULL,
    `inventory` LONGTEXT NULL,
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id`(`id`),
    INDEX `last_updated`(`last_updated`),
    INDEX `license`(`license`),
    PRIMARY KEY (`citizenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playerskins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizenid` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `skin` TEXT NOT NULL,
    `active` TINYINT NOT NULL DEFAULT 1,

    INDEX `active`(`active`),
    INDEX `citizenid`(`citizenid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stashitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stash` VARCHAR(255) NOT NULL,
    `items` LONGTEXT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`stash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trunkitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(255) NOT NULL,
    `items` LONGTEXT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`plate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `pwd` TEXT NOT NULL,
    `lastip` VARCHAR(20) NULL,
    `lastco` BIGINT NULL,
    `adminLvl` INTEGER NOT NULL DEFAULT 0,
    `whitelistStatus` BOOLEAN NOT NULL DEFAULT false,
    `emailToken` VARCHAR(255) NULL,
    `passwordToken` VARCHAR(255) NULL,
    `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    `newsletter` BOOLEAN NOT NULL DEFAULT false,
    `discord` VARCHAR(20) NULL,
    `registryDate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `first` BOOLEAN NULL DEFAULT true,
    `steam` VARCHAR(20) NULL,
    `fivem` VARCHAR(10) NULL,
    `live` VARCHAR(20) NULL,
    `xbl` VARCHAR(20) NULL,
    `license` VARCHAR(50) NULL,
    `secure_auth` BOOLEAN NULL DEFAULT false,
    `secure_code` VARCHAR(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spawnName` VARCHAR(50) NOT NULL DEFAULT '0',
    `plate` VARCHAR(50) NOT NULL DEFAULT '0',
    `customes` VARCHAR(50) NOT NULL DEFAULT '0',
    `owner` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
