import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744461833743 implements MigrationInterface {
	name = 'Init1744461833743';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "user"."IDX_240080a924cd6373a3c53489cd"`);
		await queryRunner.query(`DROP INDEX "user"."IDX_f2c9a34431155346a485d8a5d0"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "username"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "salt"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "hash"`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "emailVerificationToken"`
		);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "isEmailVerified"`);
		await queryRunner.query(`DROP TYPE "user"."usersSettings_isemailverified_enum"`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "isVerificationEmailSent"`
		);
		await queryRunner.query(`DROP TYPE "user"."usersSettings_isverificationemailsent_enum"`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "isWelcomeEmailSent"`
		);
		await queryRunner.query(`DROP TYPE "user"."usersSettings_iswelcomeemailsent_enum"`);

		// Create the enum types before using them
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_isemailverified_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_isverificationemailsent_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_iswelcomeemailsent_enum" AS ENUM('1', '0')`
		);

		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "emailVerificationToken" character varying(50) NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isEmailVerified" "user"."usersSettings_isemailverified_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isVerificationEmailSent" "user"."usersSettings_isverificationemailsent_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isWelcomeEmailSent" "user"."usersSettings_iswelcomeemailsent_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "username" character varying(100) NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" ADD "salt" text NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" ADD "hash" text NOT NULL`);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_f2c9a34431155346a485d8a5d0" ON "user"."usersSettings" ("emailVerificationToken") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_240080a924cd6373a3c53489cd" ON "user"."usersSettings" ("username") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "user"."IDX_240080a924cd6373a3c53489cd"`);
		await queryRunner.query(`DROP INDEX "user"."IDX_f2c9a34431155346a485d8a5d0"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "hash"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "salt"`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "username"`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "isWelcomeEmailSent"`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "isVerificationEmailSent"`
		);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" DROP COLUMN "isEmailVerified"`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP COLUMN "emailVerificationToken"`
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_iswelcomeemailsent_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isWelcomeEmailSent" "user"."usersSettings_iswelcomeemailsent_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_isverificationemailsent_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isVerificationEmailSent" "user"."usersSettings_isverificationemailsent_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersSettings_isemailverified_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "isEmailVerified" "user"."usersSettings_isemailverified_enum" NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "emailVerificationToken" character varying(50) NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" ADD "hash" text NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user"."usersSettings" ADD "salt" text NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD "username" character varying(100) NOT NULL`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_f2c9a34431155346a485d8a5d0" ON "user"."usersSettings" ("emailVerificationToken") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_240080a924cd6373a3c53489cd" ON "user"."usersSettings" ("username") `
		);
	}
}
