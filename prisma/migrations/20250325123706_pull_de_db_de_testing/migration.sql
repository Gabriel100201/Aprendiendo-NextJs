/*
  Warnings:

  - Made the column `tag` on table `menu_categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_categoria` on table `menu_serv_cat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_servicio` on table `menu_serv_cat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_organismo` on table `menu_servicios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `menu_categoria` MODIFY `tag` VARCHAR(100) NOT NULL,
    MODIFY `descripcion` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `menu_organismo` MODIFY `organismo` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `menu_serv_cat` MODIFY `id_categoria` INTEGER NOT NULL,
    MODIFY `id_servicio` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `menu_servicios` MODIFY `id_organismo` INTEGER NOT NULL,
    MODIFY `titulo` VARCHAR(60) NULL,
    MODIFY `icono` VARCHAR(50) NULL,
    MODIFY `subtitulo` VARCHAR(150) NULL,
    MODIFY `resumen` VARCHAR(250) NULL,
    MODIFY `tipo_componente` VARCHAR(50) NULL,
    MODIFY `id_menu` VARCHAR(50) NULL,
    MODIFY `roles` VARCHAR(50) NULL,
    MODIFY `estado_servicio` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `WL_LLR_DEFAULTSERVER` (
    `XIDSTR` VARCHAR(40) NOT NULL,
    `POOLNAMESTR` VARCHAR(64) NULL,
    `RECORDSTR` VARCHAR(1000) NULL,

    PRIMARY KEY (`XIDSTR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reestablecer_solicitud_clave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `persona` VARCHAR(50) NOT NULL,
    `clave_url` VARCHAR(512) NOT NULL,
    `clave_sms` VARCHAR(512) NOT NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_caduca_url` DATETIME(0) NOT NULL,

    INDEX `fecha_caduca_url`(`fecha_caduca_url`),
    INDEX `persona`(`persona`, `clave_url`),
    INDEX `persona_2`(`persona`, `clave_sms`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicios_cidi` (
    `ministerio` TEXT NULL,
    `titulo` TEXT NULL,
    `resumen` TEXT NULL,
    `id` TEXT NULL,
    `roles` TEXT NULL,
    `estadoServicio` TEXT NULL,
    `categoria` TEXT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_cert_antecedentes` (
    `idvalidacion` VARCHAR(50) NOT NULL,
    `persona` VARCHAR(30) NOT NULL,
    `_timestamp_` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_certifCF` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `cuit` VARCHAR(12) NOT NULL,
    `nro_certificado` VARCHAR(20) NULL,
    `fecha_emision` VARCHAR(20) NULL,
    `fecha_vencimiento` VARCHAR(20) NULL,
    `_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`, `cuit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_certif_activos` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `dni` VARCHAR(10) NOT NULL,
    `fecha_emision` VARCHAR(10) NULL,
    `liquida_mes` VARCHAR(3) NULL,
    `liquida_anio` VARCHAR(3) NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`, `dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_conf_documentos` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Reparticion` VARCHAR(255) NOT NULL,
    `NombreDocumento` VARCHAR(255) NOT NULL,
    `PrefijoTipoDocumento` VARCHAR(255) NOT NULL,
    `Usuario` VARCHAR(255) NOT NULL,
    `Param1` VARCHAR(255) NULL,
    `Param2` VARCHAR(255) NULL,
    `Param3` VARCHAR(255) NULL,
    `Param4` VARCHAR(255) NULL,
    `habilitado` INTEGER NOT NULL DEFAULT 0,
    `Param1_formato` VARCHAR(255) NULL,
    `Param2_formato` VARCHAR(255) NULL,
    `Param3_formato` VARCHAR(255) NULL,
    `Param4_formato` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_covid19` (
    `idvalidacion` VARCHAR(8) NOT NULL,
    `dni` INTEGER NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` BIGINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_covid19_frontera` (
    `id_validacion` VARCHAR(10) NOT NULL,
    `dni` INTEGER NOT NULL,
    `_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` BIGINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_documentos` (
    `idValidacion` VARCHAR(10) NOT NULL,
    `parametro1` VARCHAR(100) NULL,
    `parametro2` VARCHAR(100) NULL,
    `parametro3` VARCHAR(100) NULL,
    `parametro4` VARCHAR(100) NULL,
    `tipoDocumento` VARCHAR(200) NULL,
    `usuario` VARCHAR(50) NOT NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idValidacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_estado_pluspagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(255) NOT NULL,
    `idTransac` VARCHAR(255) NOT NULL,
    `estado_operacion` VARCHAR(255) NULL,
    `respuesta_pluspagos` VARCHAR(1000) NULL,
    `time_stamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_expediente` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `dni` VARCHAR(20) NOT NULL,
    `num_expediente` VARCHAR(100) NULL,
    `_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`, `dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_nomivac` (
    `idvalidacion` VARCHAR(20) NOT NULL,
    `dniUsuario` VARCHAR(20) NOT NULL,
    `fechaEmision` VARCHAR(20) NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` BIGINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_oficioceropj` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `fecha_emision` VARCHAR(30) NULL,
    `dni` VARCHAR(10) NOT NULL,
    `numero_oficio_electronico` VARCHAR(30) NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`, `dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_partida` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `dnipadre` VARCHAR(10) NULL,
    `dnimadre` VARCHAR(10) NULL,
    `dnipersona` VARCHAR(10) NULL,
    `nrotomo` VARCHAR(30) NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_pertran` (
    `idvalidacion` VARCHAR(15) NOT NULL,
    `dni` VARCHAR(10) NOT NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` BIGINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_recibo` (
    `idvalidacion` VARCHAR(100) NOT NULL,
    `neto` VARCHAR(30) NOT NULL,
    `padron` VARCHAR(30) NOT NULL,
    `fechanac` VARCHAR(30) NOT NULL,
    `periodo` VARCHAR(10) NOT NULL,
    `persona` VARCHAR(50) NOT NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `generaciones` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`idvalidacion`, `neto`, `padron`, `fechanac`, `periodo`, `persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_residual` (
    `idvalidacion` VARCHAR(10) NOT NULL,
    `DNI` VARCHAR(30) NOT NULL,
    `_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idvalidacion`, `DNI`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valida_servicios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidi` VARCHAR(50) NOT NULL,
    `servicio` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_categoria` ON `menu_serv_cat`(`id_categoria`);

-- CreateIndex
CREATE INDEX `fk_servicio` ON `menu_serv_cat`(`id_servicio`);

-- CreateIndex
CREATE INDEX `fk_organismo` ON `menu_servicios`(`id_organismo`);

-- AddForeignKey
ALTER TABLE `menu_serv_cat` ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `menu_categoria`(`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menu_serv_cat` ADD CONSTRAINT `fk_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `menu_servicios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menu_servicios` ADD CONSTRAINT `fk_organismo` FOREIGN KEY (`id_organismo`) REFERENCES `menu_organismo`(`id_organismo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
