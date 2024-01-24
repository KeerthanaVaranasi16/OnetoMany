import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31706072826488 implements MigrationInterface {
    name = 'Migration31706072826488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "phn_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "phn_number" integer NOT NULL`);
    }

}
