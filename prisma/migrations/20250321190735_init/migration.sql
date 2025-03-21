-- CreateTable
CREATE TABLE `menu_categoria` (
    `id_categoria` INTEGER NOT NULL,
    `tag` TEXT NULL,
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_organismo` (
    `id_organismo` INTEGER NOT NULL,
    `organismo` TEXT NULL,

    PRIMARY KEY (`id_organismo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_serv_cat` (
    `id_categoria` INTEGER NULL,
    `id_servicio` INTEGER NULL,
    `id_serv_cat` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id_serv_cat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_servicios` (
    `id` INTEGER NOT NULL,
    `id_organismo` INTEGER NULL,
    `titulo` TEXT NULL,
    `icono` TEXT NULL,
    `subtitulo` TEXT NULL,
    `resumen` TEXT NULL,
    `tipo_componente` TEXT NULL,
    `id_menu` TEXT NULL,
    `roles` TEXT NULL,
    `estado_servicio` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `mail`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
