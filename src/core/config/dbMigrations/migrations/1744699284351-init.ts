import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744699284351 implements MigrationInterface {
    name = 'Init1744699284351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."usersSettings" ALTER COLUMN "emailVerificationToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."usersSettings" ALTER COLUMN "emailVerificationToken" SET NOT NULL`);
    }

}
