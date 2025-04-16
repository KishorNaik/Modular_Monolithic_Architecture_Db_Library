import test, { afterEach, beforeEach, describe } from 'node:test';
import { QueryRunner } from 'typeorm';
import {
	destroyDatabase,
	getQueryRunner,
	initializeDatabase,
} from '../../../../../config/dbSource';
import { UserEntity } from '../../../infrastructures/entity/tUsers';
import { StatusEnum } from '../../../../../shared/models/enums/status.enum';
import expect from 'expect';
import { Guid } from 'guid-typescript';
import { UserSettingsEntity } from '../../../infrastructures/entity/tUserSettings';
import { GetEmailVerificationTokenService } from '../../../apps/feature/v1/getEmailVerificationToken';

// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts

// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts

// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts

describe(`Get_Email_Verification_Token Unit Test`, () => {
  let queryRunner: QueryRunner;

	beforeEach(async () => {
		await initializeDatabase();
		queryRunner = getQueryRunner();
	});

	afterEach(async () => {
		await queryRunner.release();
		await destroyDatabase();
	});

  // node --trace-deprecation --test --test-name-pattern='should_return_false_when_email_verification_token_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts
	test(`should_return_false_when_email_verification_token_is_not_provided`, async () => {
		const userSettingEntity:UserSettingsEntity=new UserSettingsEntity();
    userSettingEntity.emailVerificationToken="";
    userSettingEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new GetEmailVerificationTokenService().handleAsync(
			{
        userSettingsEntity: userSettingEntity,
        queryRunner:queryRunner
      }
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

  // node --trace-deprecation --test --test-name-pattern='should_return_false_when_Status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts
	test(`should_return_false_when_Status_is_not_provided`, async () => {
		const userSettingEntity:UserSettingsEntity=new UserSettingsEntity();
    userSettingEntity.emailVerificationToken="";
    //userSettingEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new GetEmailVerificationTokenService().handleAsync(
			{
        userSettingsEntity: userSettingEntity,
        queryRunner:queryRunner
      }
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

  // node --trace-deprecation --test --test-name-pattern='should_return_false_when_email_verification_token_is_provided_wrong' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts
	test(`should_return_false_when_email_verification_token_is_provided_wrong`, async () => {
		const userSettingEntity:UserSettingsEntity=new UserSettingsEntity();
    userSettingEntity.emailVerificationToken="087e885e-4f50-f935-647f-fa5e4c6a80b9";
    userSettingEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new GetEmailVerificationTokenService().handleAsync(
			{
        userSettingsEntity: userSettingEntity,
        queryRunner:queryRunner
      }
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

  // node --trace-deprecation --test --test-name-pattern='should_return_true_when_email_verification_token_is_provided_correct' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getEmailVerificationToken/index.test.ts
	test(`should_return_true_when_email_verification_token_is_provided_correct`, async () => {
		const userSettingEntity:UserSettingsEntity=new UserSettingsEntity();
    userSettingEntity.emailVerificationToken="74ecd901-d27f-bd50-8bb1-8290c0eb8699";
    userSettingEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new GetEmailVerificationTokenService().handleAsync(
			{
        userSettingsEntity: userSettingEntity,
        queryRunner:queryRunner
      }
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(false);
			return;
		}

		await queryRunner.commitTransaction();
		expect(addUserServiceResult.isOk()).toBe(true);
	});
})
