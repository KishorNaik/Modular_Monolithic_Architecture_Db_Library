import expect from 'expect';
import { Guid } from 'guid-typescript';
import test, { afterEach, beforeEach, describe } from 'node:test';
import { QueryRunner } from 'typeorm';
import {
	destroyDatabase,
	getQueryRunner,
	initializeDatabase,
} from '../../../../../config/dbSource';
import { UserEntity } from '../../../infrastructures/entity/tUsers';
import { StatusEnum } from '../../../../../shared/models/enums/status.enum';
import { BoolEnum } from '../../../../../shared/models/enums/bool.enum';
import { UpdateUserCommunicationService, UpdateUserCredentialsService, UpdateUserKeysService, UpdateUserService, UpdateUserSettingsService } from '../../../apps/feature/v1/updateUsers';
import { UserCommunicationEntity } from '../../../infrastructures/entity/tUserCommunication';
import { UserCredentialsEntity } from '../../../infrastructures/entity/tUserCredentials';
import { UserKeysEntity } from '../../../infrastructures/entity/tUserKeys';
import { UserSettingsEntity } from '../../../infrastructures/entity/tUserSettings';

// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts

// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts

// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts

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

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.firstName = '';
		userEntity.lastName = '';
		userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new UpdateUserService().handleAsync(
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

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier=""
    userEntity.firstName = '';
		userEntity.lastName = '';
		//userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new UpdateUserService().handleAsync(
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

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_validation_service_failed`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier=""
    userEntity.firstName = '';
		userEntity.lastName = '';
		userEntity.status = StatusEnum.ACTIVE;
		userEntity.created_date = new Date();
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new UpdateUserService().handleAsync(
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

  //node --trace-deprecation --test --test-name-pattern='should_return_true_when_all_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_true_when_all_service_passed`, async () => {
		const userEntity: UserEntity = new UserEntity();
		userEntity.identifier="754e1ad7-15c2-3f4b-ea37-83150bb826ab"
    userEntity.firstName = 'eshaan';
		//userEntity.lastName = 'naik';
		userEntity.status = StatusEnum.ACTIVE;
		userEntity.modified_date = new Date();

		await queryRunner.startTransaction();

		const addUserServiceResult = await new UpdateUserService().handleAsync(
			userEntity,
			queryRunner
		);
		if (addUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(addUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(addUserServiceResult.isOk()).toBe(true);
	});

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_userCommunication_identifier_is_not_provided`, async () => {
		const userCommunicationEntity= new UserCommunicationEntity();
    userCommunicationEntity.identifier=""
    userCommunicationEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (updateUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(updateUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(updateUserServiceResult.isOk()).toBe(true);
	});

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_Status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_userCommunication_Status_is_not_provided`, async () => {
		const userCommunicationEntity= new UserCommunicationEntity();
    userCommunicationEntity.identifier=""
    //userCommunicationEntity.status=StatusEnum.INACTIVE;

		await queryRunner.startTransaction();

		const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (updateUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(updateUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(updateUserServiceResult.isOk()).toBe(true);
	});

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_Validation_service_is_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
  test(`should_return_false_when_userCommunication_Validation_service_is_failed`, async () => {
		const userCommunicationEntity= new UserCommunicationEntity();
    userCommunicationEntity.identifier=""
    userCommunicationEntity.status=StatusEnum.INACTIVE;
    userCommunicationEntity.email="";
    userCommunicationEntity.mobileNo="";

		await queryRunner.startTransaction();

		const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
			userCommunicationEntity,
			queryRunner
		);
		if (updateUserServiceResult.isErr()) {
			await queryRunner.rollbackTransaction();
			expect(updateUserServiceResult.isErr()).toBe(true);
			return;
		}

		await queryRunner.commitTransaction();
		expect(updateUserServiceResult.isOk()).toBe(true);
	});

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_all_service_is_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_true_when_userCommunication_all_service_is_passed`, async () => {
      const userCommunicationEntity= new UserCommunicationEntity();
      userCommunicationEntity.identifier="d8fe7ad1-0db4-e749-86b5-119c85134bc3"
      userCommunicationEntity.status=StatusEnum.INACTIVE;
      userCommunicationEntity.email="jhonwick1@gmail.com";
      userCommunicationEntity.mobileNo="9167777771";
      userCommunicationEntity.modified_date = new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
        userCommunicationEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_emailId_already_exists' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userCommunication_emailId_already_exists`, async () => {
      const userCommunicationEntity= new UserCommunicationEntity();
      userCommunicationEntity.identifier="d8fe7ad1-0db4-e749-86b5-119c85134bc3"
      userCommunicationEntity.status=StatusEnum.INACTIVE;
      userCommunicationEntity.email="kishor.naik.dev@gmail.com";
      userCommunicationEntity.mobileNo="9167777771";
      userCommunicationEntity.modified_date = new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
        userCommunicationEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_mobileNo_already_exists' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userCommunication_mobileNo_already_exists`, async () => {
      const userCommunicationEntity= new UserCommunicationEntity();
      userCommunicationEntity.identifier="d8fe7ad1-0db4-e749-86b5-119c85134bc3"
      userCommunicationEntity.status=StatusEnum.INACTIVE;
      userCommunicationEntity.email="jhonwick1@gmail.com";
      userCommunicationEntity.mobileNo="9167791111";
      userCommunicationEntity.modified_date = new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCommunicationService().handleAsync(
        userCommunicationEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userCredential_identifier_is_not_provided`, async () => {
      const userCredentialsEntity=new UserCredentialsEntity();
      userCredentialsEntity.identifier="";
      userCredentialsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCredentialsService().handleAsync(
        userCredentialsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userCredential_status_is_not_provided`, async () => {
      const userCredentialsEntity=new UserCredentialsEntity();
      userCredentialsEntity.identifier="";
      //userCredentialsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCredentialsService().handleAsync(
        userCredentialsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userCredential_validation_service_failed`, async () => {
      const userCredentialsEntity=new UserCredentialsEntity();
      userCredentialsEntity.identifier="";
      userCredentialsEntity.status=StatusEnum.INACTIVE;
      userCredentialsEntity.username="";
      userCredentialsEntity.hash="";
      userCredentialsEntity.salt="";

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCredentialsService().handleAsync(
        userCredentialsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userCredential_Services_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_true_when_userCredential_Services_passed`, async () => {
      const userCredentialsEntity=new UserCredentialsEntity();
      userCredentialsEntity.identifier="a3f321d4-f8ef-41ad-7e4b-9aedebdf9b64";
      userCredentialsEntity.status=StatusEnum.INACTIVE;
      userCredentialsEntity.username="jhonwick@gmail.com";
      userCredentialsEntity.hash="e5240ea8-a2f5-4b17-9c13-9d9e4f3b5960";
      userCredentialsEntity.salt="7978a832-579b-9974-70cc-21820a476636";
      userCredentialsEntity.modified_date=new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserCredentialsService().handleAsync(
        userCredentialsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(false);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userKeys_identifier_is_not_provided`, async () => {

      const userKeysEntity=new UserKeysEntity();
      userKeysEntity.identifier="";
      userKeysEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserKeysService().handleAsync(
        userKeysEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userKeys_status_is_not_provided`, async () => {

      const userKeysEntity=new UserKeysEntity();
      userKeysEntity.identifier="";
      //userKeysEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserKeysService().handleAsync(
        userKeysEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userKeys_validation_service_failed`, async () => {

      const userKeysEntity=new UserKeysEntity();
      userKeysEntity.identifier="";
      userKeysEntity.status=StatusEnum.INACTIVE;
      userKeysEntity.aesSecretKey="";
      userKeysEntity.hmacSecretKey="";
      userKeysEntity.refresh_token="";
      userKeysEntity.refresh_Token_expires_at=new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserKeysService().handleAsync(
        userKeysEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

     //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userKeys_all_services_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
     test(`should_return_true_when_userKeys_all_services_passed`, async () => {

      const userKeysEntity=new UserKeysEntity();
      userKeysEntity.identifier="65abc507-944d-63f9-9ee2-0eea96a97784";
      userKeysEntity.status=StatusEnum.INACTIVE;
      userKeysEntity.aesSecretKey=Guid.create().toString();
      userKeysEntity.hmacSecretKey=Guid.create().toString();;
      //userKeysEntity.refresh_token=null;
      //userKeysEntity.refresh_Token_expires_at=new Date();

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserKeysService().handleAsync(
        userKeysEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(false);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(true);
    });

     //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
     test(`should_return_false_when_userSettings_identifier_is_not_provided`, async () => {

      const userSettingsEntity=new UserSettingsEntity();
      userSettingsEntity.identifier="";
      userSettingsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserSettingsService().handleAsync(
        userSettingsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userSettings_status_is_not_provided`, async () => {

      const userSettingsEntity=new UserSettingsEntity();
      userSettingsEntity.identifier="";
      //userSettingsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserSettingsService().handleAsync(
        userSettingsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_false_when_userSettings_validation_service_failed`, async () => {

      const userSettingsEntity=new UserSettingsEntity();
      userSettingsEntity.identifier="d295b903-bb94-a6ef-c155-f9a702aa8301";
      userSettingsEntity.emailVerificationToken="";
      userSettingsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserSettingsService().handleAsync(
        userSettingsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userSettings_all_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    test(`should_return_true_when_userSettings_all_service_passed`, async () => {

      const userSettingsEntity=new UserSettingsEntity();
      userSettingsEntity.identifier="d295b903-bb94-a6ef-c155-f9a702aa8301";
      userSettingsEntity.emailVerificationToken="850f0dd9-5c77-0d94-9ab4-7cf65429cb56";
      userSettingsEntity.status=StatusEnum.INACTIVE;

      await queryRunner.startTransaction();

      const updateUserServiceResult = await new UpdateUserSettingsService().handleAsync(
        userSettingsEntity,
        queryRunner
      );
      if (updateUserServiceResult.isErr()) {
        await queryRunner.rollbackTransaction();
        expect(updateUserServiceResult.isErr()).toBe(true);
        return;
      }

      await queryRunner.commitTransaction();
      expect(updateUserServiceResult.isOk()).toBe(false);
    });

});
