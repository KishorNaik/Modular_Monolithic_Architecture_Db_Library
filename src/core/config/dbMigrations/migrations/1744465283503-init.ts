import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744465283503 implements MigrationInterface {
	name = 'Init1744465283503';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user"."usersSettings" ("id" BIGSERIAL NOT NULL, "identifier" character varying(50) NOT NULL, "status" "user"."usersSettings_status_enum" NOT NULL DEFAULT '0', "created_date" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "modified_date" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "version" integer NOT NULL, "emailVerificationToken" character varying(50) NOT NULL, "isEmailVerified" "user"."usersSettings_isemailverified_enum" NOT NULL DEFAULT '0', "isVerificationEmailSent" "user"."usersSettings_isverificationemailsent_enum" NOT NULL DEFAULT '0', "isWelcomeEmailSent" "user"."usersSettings_iswelcomeemailsent_enum" NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "REL_7d96ee4e2f7c3859cb5faed119" UNIQUE ("userId"), CONSTRAINT "PK_1342b6c4965a154d3280bf3cafc" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_d5c846569bd98a576b01245290" ON "user"."usersSettings" ("identifier") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_f2c9a34431155346a485d8a5d0" ON "user"."usersSettings" ("emailVerificationToken") `
		);
		await queryRunner.query(
			`CREATE TYPE "user"."usersCredentials_status_enum" AS ENUM('1', '0')`
		);
		await queryRunner.query(
			`CREATE TABLE "user"."usersCredentials" ("id" BIGSERIAL NOT NULL, "identifier" character varying(50) NOT NULL, "status" "user"."usersCredentials_status_enum" NOT NULL DEFAULT '0', "created_date" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "modified_date" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "version" integer NOT NULL, "username" character varying(100) NOT NULL, "salt" text NOT NULL, "hash" text NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "REL_a1868088106c45bf780b81b882" UNIQUE ("userId"), CONSTRAINT "PK_e372b5067676cfd97595e9a94bf" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_5b34542818fbe92c194acc7465" ON "user"."usersCredentials" ("identifier") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_46b05162902521561a750c643f" ON "user"."usersCredentials" ("username") `
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" ADD CONSTRAINT "FK_7d96ee4e2f7c3859cb5faed119d" FOREIGN KEY ("userId") REFERENCES "user"."users"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersCredentials" ADD CONSTRAINT "FK_a1868088106c45bf780b81b882a" FOREIGN KEY ("userId") REFERENCES "user"."users"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user"."usersCredentials" DROP CONSTRAINT "FK_a1868088106c45bf780b81b882a"`
		);
		await queryRunner.query(
			`ALTER TABLE "user"."usersSettings" DROP CONSTRAINT "FK_7d96ee4e2f7c3859cb5faed119d"`
		);
		await queryRunner.query(`DROP INDEX "user"."IDX_46b05162902521561a750c643f"`);
		await queryRunner.query(`DROP INDEX "user"."IDX_5b34542818fbe92c194acc7465"`);
		await queryRunner.query(`DROP TABLE "user"."usersCredentials"`);
		await queryRunner.query(`DROP TYPE "user"."usersCredentials_status_enum"`);
		await queryRunner.query(`DROP INDEX "user"."IDX_f2c9a34431155346a485d8a5d0"`);
		await queryRunner.query(`DROP INDEX "user"."IDX_d5c846569bd98a576b01245290"`);
		await queryRunner.query(`DROP TABLE "user"."usersSettings"`);
	}
}
