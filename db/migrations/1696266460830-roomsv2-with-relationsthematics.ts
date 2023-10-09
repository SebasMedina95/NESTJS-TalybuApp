import { MigrationInterface, QueryRunner } from "typeorm";

export class Roomsv2WithRelationsthematics1696266460830 implements MigrationInterface {
    name = 'Roomsv2WithRelationsthematics1696266460830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "HABIT_HABITACIONES" ("HABIT_ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "HABIT_NUMERO" integer NOT NULL, "HABIT_DESCRIPCION" character varying(1000), "HABIT_TIPO" character varying(50), "HABIT_ESTADO" boolean NOT NULL DEFAULT true, "HABIT_USUARIO_CREACION" character varying(30) NOT NULL, "HABIT_FECHA_CREACION" TIMESTAMP, "TEMAT_ID" uuid, CONSTRAINT "UQ_ea427bb5d00b72a6f2e12e87491" UNIQUE ("HABIT_NUMERO"), CONSTRAINT "PK_9c6642aa3b45a86c3ab3a4ab4c0" PRIMARY KEY ("HABIT_ID")); COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_NUMERO" IS 'Número de la habitación'; COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_DESCRIPCION" IS 'Descripción de la habitación'; COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_TIPO" IS 'Tipo de la habitación'; COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_ESTADO" IS 'Estado Lógico de la habitación'; COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "HABIT_HABITACIONES"."HABIT_FECHA_CREACION" IS 'Fecha creación'`);
        await queryRunner.query(`ALTER TABLE "HABIT_HABITACIONES" ADD CONSTRAINT "FK_6b1a7b0fad75b533e6aff58fb03" FOREIGN KEY ("TEMAT_ID") REFERENCES "TEMAT_TEMATICAS_HABITACION"("TEMAT_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HABIT_HABITACIONES" DROP CONSTRAINT "FK_6b1a7b0fad75b533e6aff58fb03"`);
        await queryRunner.query(`DROP TABLE "HABIT_HABITACIONES"`);
    }

}
