import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744785591717 implements MigrationInterface {
	name = 'Init1744785591717';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "email_Verification_Token_expires_at" date`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "email_Verification_Token_expires_at"`
		);
	}
}
