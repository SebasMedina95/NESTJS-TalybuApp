import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyBooleanToStringV11695697648189 implements MigrationInterface {
    name = 'ModifyBooleanToStringV11695697648189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COMOD_COMODIDADES_HABITACION" ALTER COLUMN "COMOD_ESTADO" SET DEFAULT 'A'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COMOD_COMODIDADES_HABITACION" ALTER COLUMN "COMOD_ESTADO" SET DEFAULT true`);
    }

}
