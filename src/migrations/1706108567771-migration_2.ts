import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21706108567771 implements MigrationInterface {
    name = 'Migration21706108567771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "isCompleted" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_7c134d062947a53f89064491e63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Todo" ADD CONSTRAINT "FK_9448f02f99ff8269ea92c2bf9e8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todo" DROP CONSTRAINT "FK_9448f02f99ff8269ea92c2bf9e8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Todo"`);
    }

}
