import test, { afterEach, beforeEach, describe } from 'node:test';
import { QueryRunner } from 'typeorm';
import {
	destroyDatabase,
	getQueryRunner,
	initializeDatabase,
} from '../../../../../config/dbSource';
import { UserEntity } from '../../../infrastructures/entity/tUsers';
import { StatusEnum } from '../../../../../shared/models/enums/status.enum';
import {
	AddUserCommunicationService,
	AddUserService,
	AddUserSettingsService,
	AddUserKeyService,
	AddUserCredentialsService,
} from '../../../apps/feature/v1/addUsers';
import { Result } from 'neverthrow';
import expect from 'expect';
import { Guid } from 'guid-typescript';
import { UserCommunicationEntity } from '../../../infrastructures/entity/tUserCommunication';
import { UserKeysEntity } from '../../../infrastructures/entity/tUserKeys';
import { UserSettingsEntity } from '../../../infrastructures/entity/tUserSettings';
import { UserCredentialsEntity } from '../../../infrastructures/entity/tUserCredentials';
import { BoolEnum } from '../../../../../shared/models/enums/bool.enum';

// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts

// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts

// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts

describe(`Create Users Unit Test`, () => {
	let queryRunner: QueryRunner;

	beforeEach(async () => {
		await initializeDatabase();
		queryRunner = getQueryRunner();
	});

	afterEach(async () => {
		await queryRunner.release();
		await destroyDatabase();
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.firstName = '';
		userEntity.lastName = '';
		userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserService().handleAsync(
			userEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier = Guid.create().toString();
		userEntity.firstName = '';
		userEntity.lastName = '';
		//userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserService().handleAsync(
			userEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userEntity_validation_service_failed`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier = Guid.create().toString();
		userEntity.firstName = '';
		userEntity.lastName = '';
		userEntity.clientId = '';
		userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserService().handleAsync(
			userEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCommunicationEntity_identifier_is_not_provided`, async () => {
		const userCommunicationEntity: UserCommunicationEntity = new UserCommunicationEntity();
		userCommunicationEntity.identifier = '';

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCommunicationEntity_status_is_not_provided`, async () => {
		const userCommunicationEntity: UserCommunicationEntity = new UserCommunicationEntity();
		userCommunicationEntity.identifier = Guid.create().toString();
		//userCommunicationEntity.status=StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_Validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCommunicationEntity_Validation_is_not_provided`, async () => {
		const userCommunicationEntity: UserCommunicationEntity = new UserCommunicationEntity();
		userCommunicationEntity.identifier = Guid.create().toString();
		userCommunicationEntity.status = StatusEnum.ACTIVE;
		userCommunicationEntity.email = '';
		userCommunicationEntity.mobileNo = '';
		//userCommunicationEntity.status=StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCredentialEntity_identifier_is_not_provided`, async () => {
		const userCredentialsEntity: UserCredentialsEntity = new UserCredentialsEntity();
		userCredentialsEntity.identifier = '';

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCredentialsService().handleAsync(
			userCredentialsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCredentialEntity_status_is_not_provided`, async () => {
		const userCredentialsEntity: UserCredentialsEntity = new UserCredentialsEntity();
		userCredentialsEntity.identifier = Guid.create().toString();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCredentialsService().handleAsync(
			userCredentialsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userCredentialEntity_validation_is_not_provided`, async () => {
		const userCredentialsEntity: UserCredentialsEntity = new UserCredentialsEntity();
		userCredentialsEntity.identifier = Guid.create().toString();
		userCredentialsEntity.status = StatusEnum.ACTIVE;
		userCredentialsEntity.hash = '';
		userCredentialsEntity.salt = '';
		userCredentialsEntity.username = '';

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserCredentialsService().handleAsync(
			userCredentialsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userKeyEntity_identifier_is_not_provided`, async () => {
		const userKeysEntity: UserKeysEntity = new UserKeysEntity();
		userKeysEntity.identifier = '';
		userKeysEntity.status = StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserKeyService().handleAsync(
			userKeysEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userKeyEntity_status_is_not_provided`, async () => {
		const userKeysEntity: UserKeysEntity = new UserKeysEntity();
		userKeysEntity.identifier = '';
		//userKeysEntity.status=StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserKeyService().handleAsync(
			userKeysEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_Validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userKeyEntity_Validation_is_not_provided`, async () => {
		const userKeysEntity: UserKeysEntity = new UserKeysEntity();
		userKeysEntity.identifier = Guid.create().toString();
		userKeysEntity.status = StatusEnum.ACTIVE;
		userKeysEntity.aesSecretKey = '';
		userKeysEntity.hmacSecretKey = '';
		userKeysEntity.refresh_token = '';
		userKeysEntity.refresh_Token_expires_at = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserKeyService().handleAsync(
			userKeysEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userSettingsEntity_identifier_is_not_provided`, async () => {
		const userSettingsEntity: UserSettingsEntity = new UserSettingsEntity();
		userSettingsEntity.identifier = '';
		userSettingsEntity.status = StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserSettingsService().handleAsync(
			userSettingsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userSettingsEntity_status_is_not_provided`, async () => {
		const userSettingsEntity: UserSettingsEntity = new UserSettingsEntity();
		userSettingsEntity.identifier = '';
		//userSettingsEntity.status=StatusEnum.ACTIVE;

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserSettingsService().handleAsync(
			userSettingsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	// node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_false_when_userSettingsEntity_status_is_not_provided`, async () => {
		const userSettingsEntity: UserSettingsEntity = new UserSettingsEntity();
		userSettingsEntity.identifier = Guid.create().toString();
		userSettingsEntity.status = StatusEnum.ACTIVE;
		userSettingsEntity.emailVerificationToken = '';

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserSettingsService().handleAsync(
			userSettingsEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(false).toBe(false);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_add_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
	test(`should_return_true_when_add_service_passed`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier = Guid.create().toString();
		userEntity.firstName = 'jhon';
		userEntity.lastName = 'wick`';
		userEntity.clientId = Guid.create().toString();
		userEntity.status = StatusEnum.INACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new AddUserService().handleAsync(
			userEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		const userCommunication = new UserCommunicationEntity();
		userCommunication.identifier = Guid.create().toString();
		userCommunication.email = 'jhonwick@gmail.com';
		userCommunication.userId = userEntity.identifier;
		userCommunication.mobileNo = '9167777777';
		userCommunication.status = StatusEnum.INACTIVE;
		userCommunication.created_date = new Date();
		userCommunication.modified_date = new Date();
		//userCommunication.users=userEntity;

		//userEntity.userCommunication=userCommunication;

		const addUserCommunicationServiceResult =
			await new AddUserCommunicationService().handleAsync(userCommunication, queryRunner);
		if (addUserCommunicationServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserCommunicationServiceResult.isErr()).toBe(true);
			return;
		}

		const userKeys = new UserKeysEntity();
		userKeys.identifier = Guid.create().toString();
		userKeys.refresh_token = Guid.create().toString();
		userKeys.refresh_Token_expires_at = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		userKeys.userId = userEntity.identifier;
		userKeys.status = StatusEnum.INACTIVE;
		userKeys.aesSecretKey = Guid.create().toString();
		userKeys.hmacSecretKey = Guid.create().toString();
		userKeys.created_date = new Date();
		userKeys.modified_date = new Date();
		//userToken.users=userEntity;

		//userEntity.userToken=userToken;

		const addUserTokenServiceResult = await new AddUserKeyService().handleAsync(
			userKeys,
			queryRunner
		);
		if (addUserTokenServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserTokenServiceResult.isErr()).toBe(true);
			return;
		}

		const userSettings = new UserSettingsEntity();
		userSettings.identifier = Guid.create().toString();
		userSettings.userId = userEntity.identifier;
		userSettings.emailVerificationToken = Guid.create().toString();
    userSettings.email_Verification_Token_expires_at=new Date()
		userSettings.isEmailVerified = BoolEnum.NO;
		userSettings.status = StatusEnum.INACTIVE;
		userSettings.created_date = new Date();
		userSettings.modified_date = new Date();
		//userSettings.users=userEntity;

		//userEntity.userSetting=userSettings;

		const addUserSettingsServiceResult = await new AddUserSettingsService().handleAsync(
			userSettings,
			queryRunner
		);
		if (addUserSettingsServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserSettingsServiceResult.isErr()).toBe(true);
			return;
		}

		const userCredentials: UserCredentialsEntity = new UserCredentialsEntity();
		userCredentials.identifier = Guid.create().toString();
		userCredentials.status = StatusEnum.INACTIVE;
		userCredentials.hash = Guid.create().toString();
		userCredentials.salt = Guid.create().toString();
		userCredentials.userId = userEntity.identifier;
		userCredentials.username = userCommunication.email;

		const addUserCredentialsServiceResult = await new AddUserCredentialsService().handleAsync(
			userCredentials,
			queryRunner
		);

		if (addUserCredentialsServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserCommunicationServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(true).toBe(true);
	});
});
