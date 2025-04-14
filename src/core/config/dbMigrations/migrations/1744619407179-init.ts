import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744619407179 implements MigrationInterface {
	name = 'Init1744619407179';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersKeys" ALTER COLUMN "refresh_Token_expires_at" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersKeys" ALTER COLUMN "refresh_Token_expires_at" SET NOT NULL`
		);
	}
}
