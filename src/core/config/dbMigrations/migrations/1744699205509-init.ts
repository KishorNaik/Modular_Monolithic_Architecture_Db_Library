import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744699205509 implements MigrationInterface {
	name = 'Init1744699205509';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "user"."IDX_f2c9a34431155346a485d8a5d0"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_f2c9a34431155346a485d8a5d0" ON "user"."usersSettings" ("emailVerificationToken") `
		);
	}
}
