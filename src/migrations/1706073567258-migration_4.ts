import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration41706073567258 implements MigrationInterface {
    name = 'Migration41706073567258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "mail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "mail" character varying NOT NULL`);
    }

}
