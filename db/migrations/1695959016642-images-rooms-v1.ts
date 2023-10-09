import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesRoomsV11695959016642 implements MigrationInterface {
    name = 'ImagesRoomsV11695959016642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "IMGHA_IMAGENES_HABITACION" ("IMGHA_ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "IMGHA_URL_IMAGEN" text NOT NULL, "IMGHA_USUARIO_CREACION" character varying(30) NOT NULL, "IMGHA_FECHA_CREACION" TIMESTAMP, "TEMAT_ID" uuid, CONSTRAINT "PK_c01c58c6e1e9d9c398aea6e238b" PRIMARY KEY ("IMGHA_ID")); COMMENT ON COLUMN "IMGHA_IMAGENES_HABITACION"."IMGHA_URL_IMAGEN" IS 'Url de la imagen de la temática de habitación.'; COMMENT ON COLUMN "IMGHA_IMAGENES_HABITACION"."IMGHA_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "IMGHA_IMAGENES_HABITACION"."IMGHA_FECHA_CREACION" IS 'Fecha creación'`);
        await queryRunner.query(`ALTER TABLE "COMOD_COMODIDADES_HABITACION" ALTER COLUMN "COMOD_ESTADO" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "IMGHA_IMAGENES_HABITACION" ADD CONSTRAINT "FK_5d72e9e44057dc14779e9c29169" FOREIGN KEY ("TEMAT_ID") REFERENCES "TEMAT_TEMATICAS_HABITACION"("TEMAT_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "IMGHA_IMAGENES_HABITACION" DROP CONSTRAINT "FK_5d72e9e44057dc14779e9c29169"`);
        await queryRunner.query(`ALTER TABLE "COMOD_COMODIDADES_HABITACION" ALTER COLUMN "COMOD_ESTADO" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "IMGHA_IMAGENES_HABITACION"`);
    }

}
