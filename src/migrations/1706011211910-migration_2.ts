import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21706011211910 implements MigrationInterface {
    name = 'Migration21706011211910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "mail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "mail"`);
    }

}
