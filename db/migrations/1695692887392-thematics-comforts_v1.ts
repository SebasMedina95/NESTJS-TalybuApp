import { MigrationInterface, QueryRunner } from "typeorm";

export class ThematicsComfortsV11695692887392 implements MigrationInterface {
    name = 'ThematicsComfortsV11695692887392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TEMAT_TEMATICAS_HABITACION" ("TEMAT_ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "TEMAT_TEMATICA" character varying(150) NOT NULL, "TEMAT_DESCRIPCION" character varying(500) NOT NULL, "TEMAT_TAMANO" character varying(30) NOT NULL, "TEMAT_CATEGORIA" character varying(20) NOT NULL, "TEMAT_TAGS" text array NOT NULL DEFAULT '{}', "TEMAT_PRECIO" numeric(20,2) NOT NULL DEFAULT '0', "TEMAT_ESTADO" character varying NOT NULL DEFAULT true, "TEMAT_PROMOCION" character varying NOT NULL DEFAULT false, "TEMAT_PORCENTAJE_PROMOCION" numeric(20,2) NOT NULL DEFAULT '0', "TEMAT_USUARIO_CREACION" character varying(30) NOT NULL, "TEMAT_FECHA_CREACION" TIMESTAMP, "TEMAT_USUARIO_ACTUALIZACION" character varying(30) NOT NULL, "TEMAT_FECHA_ACTUALIZACION" TIMESTAMP, CONSTRAINT "UQ_c5654f2c4f1b000824ebd75900b" UNIQUE ("TEMAT_TEMATICA"), CONSTRAINT "PK_263b517335bed240500b482d6f8" PRIMARY KEY ("TEMAT_ID")); COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_TEMATICA" IS 'Temática de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_DESCRIPCION" IS 'Descripción de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_TAMANO" IS 'Tamaño de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_CATEGORIA" IS 'Categoría de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_TAGS" IS 'Tags de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_PRECIO" IS 'Precio de la Temática de habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_ESTADO" IS 'Estado Lógico de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_PROMOCION" IS 'Promociones Habilitadas de la Temática de Habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_PORCENTAJE_PROMOCION" IS 'Porcentaje Promoción de la Temática de habitación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_FECHA_CREACION" IS 'Fecha creación'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_USUARIO_ACTUALIZACION" IS 'Documento de usuario que actualizó'; COMMENT ON COLUMN "TEMAT_TEMATICAS_HABITACION"."TEMAT_FECHA_ACTUALIZACION" IS 'Fecha creación'`);
        await queryRunner.query(`CREATE TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES" ("MTECO_ID" SERIAL NOT NULL, "TEMAT_TEMATICA" uuid, "COMOD_ID" uuid, CONSTRAINT "PK_de744321b59b3a9c4729c59559c" PRIMARY KEY ("MTECO_ID")); COMMENT ON COLUMN "MTECO_MAESTRO_TEMATICAS_COMODIDADES"."MTECO_ID" IS 'Clave primaria de tabla'`);
        await queryRunner.query(`CREATE TABLE "COMOD_COMODIDADES_HABITACION" ("COMOD_ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "COMOD_COMODIDAD" character varying(100) NOT NULL, "COMOD_ESTADO" character varying NOT NULL DEFAULT true, "COMOD_USUARIO_CREACION" character varying(30) NOT NULL, "COMOD_FECHA_CREACION" TIMESTAMP, "COMOD_USUARIO_ACTUALIZACION" character varying(30) NOT NULL, "COMOD_FECHA_ACTUALIZACION" TIMESTAMP, CONSTRAINT "UQ_3324d7ee6cc1741004f6f915292" UNIQUE ("COMOD_COMODIDAD"), CONSTRAINT "PK_aceebf39a8491e14c99cb857ccb" PRIMARY KEY ("COMOD_ID")); COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_COMODIDAD" IS 'Comodidad de Habitación'; COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_ESTADO" IS 'Estado Comodidad de Habitación'; COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_FECHA_CREACION" IS 'Fecha creación'; COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_USUARIO_ACTUALIZACION" IS 'Documento de usuario que actualizó'; COMMENT ON COLUMN "COMOD_COMODIDADES_HABITACION"."COMOD_FECHA_ACTUALIZACION" IS 'Fecha creación'`);
        await queryRunner.query(`ALTER TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES" ADD CONSTRAINT "FK_6f4c2be1c32b39722449e3c760c" FOREIGN KEY ("TEMAT_TEMATICA") REFERENCES "TEMAT_TEMATICAS_HABITACION"("TEMAT_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES" ADD CONSTRAINT "FK_5b8e63a32b604f0ed85af4a4fd7" FOREIGN KEY ("COMOD_ID") REFERENCES "COMOD_COMODIDADES_HABITACION"("COMOD_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES" DROP CONSTRAINT "FK_5b8e63a32b604f0ed85af4a4fd7"`);
        await queryRunner.query(`ALTER TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES" DROP CONSTRAINT "FK_6f4c2be1c32b39722449e3c760c"`);
        await queryRunner.query(`DROP TABLE "COMOD_COMODIDADES_HABITACION"`);
        await queryRunner.query(`DROP TABLE "MTECO_MAESTRO_TEMATICAS_COMODIDADES"`);
        await queryRunner.query(`DROP TABLE "TEMAT_TEMATICAS_HABITACION"`);
    }

}