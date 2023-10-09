import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersForAuthsystem1696296737799 implements MigrationInterface {
    name = 'UsersForAuthsystem1696296737799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USUAR_USUARIOS" ("USUAR_ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "USUAR_DOCUMENTO" character varying(30), "USUAR_TIPO_DOCUMENTO" character varying(30), "USUAR_NOMBRE_COMPLETO" character varying(150) NOT NULL, "USUAR_TELEFONO" character varying(30), "USUAR_DIRECCION" character varying(30), "USUAR_CORREO_ELECTRONICO" character varying(100) NOT NULL, "USUAR_PASSWORD" character varying(100) NOT NULL, "USUAR_ESTADO" boolean NOT NULL DEFAULT true, "USUAR_ROLES" text array NOT NULL DEFAULT '{USER}', "USUAR_USUARIO_CREACION" character varying(30) NOT NULL, "USUAR_FECHA_CREACION" TIMESTAMP, "USUAR_USUARIO_ACTUALIZACION" character varying(30) NOT NULL, "USUAR_FECHA_ACTUALIZACION" TIMESTAMP, CONSTRAINT "UQ_0c15a40f91da43e0c7b3fc4e0ea" UNIQUE ("USUAR_DOCUMENTO"), CONSTRAINT "UQ_f86569fc56a8b2d668b0f6c2d31" UNIQUE ("USUAR_CORREO_ELECTRONICO"), CONSTRAINT "PK_9f4832848fb6c7722d7b215d6d6" PRIMARY KEY ("USUAR_ID")); COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_DOCUMENTO" IS 'Documento del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_TIPO_DOCUMENTO" IS 'Tipo Documento del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_NOMBRE_COMPLETO" IS 'Nombre Completo del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_TELEFONO" IS 'Teléfono del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_DIRECCION" IS 'Dirección del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_CORREO_ELECTRONICO" IS 'Correo Electrónico del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_PASSWORD" IS 'Contraseña del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_ESTADO" IS 'Estado Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_ROLES" IS 'Roles del Usuario'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_FECHA_CREACION" IS 'Fecha creación'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_USUARIO_ACTUALIZACION" IS 'Documento de usuario que actualizó'; COMMENT ON COLUMN "USUAR_USUARIOS"."USUAR_FECHA_ACTUALIZACION" IS 'Fecha creación'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "USUAR_USUARIOS"`);
    }

}
