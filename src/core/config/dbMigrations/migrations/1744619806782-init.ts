import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744619806782 implements MigrationInterface {
	name = 'Init1744619806782';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersKeys" DROP CONSTRAINT "UQ_9429ee84b3368fc4db41ec24cbb"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersKeys" ADD CONSTRAINT "UQ_9429ee84b3368fc4db41ec24cbb" UNIQUE ("refresh_token")`
		);
	}
}
