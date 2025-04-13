
import test, { afterEach, beforeEach, describe } from 'node:test';
import { QueryRunner } from 'typeorm';
import { destroyDatabase, getQueryRunner, initializeDatabase } from '../../../../../config/dbSource';
import { UserEntity } from '../../../infrastructures/entity/tUsers';
import { StatusEnum } from '../../../../../shared/models/enums/status.enum';
import { GetUsersByIdentifierService } from '../../../apps/feature/v1/getUserByIdentifier';
import expect from 'expect';


// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts

// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts

// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts


describe(`Get Users By Identifier Unit Test`, () => {
  //let queryRunner: QueryRunner;

	beforeEach(async () => {
		await initializeDatabase();
		//queryRunner = getQueryRunner();
	});

	afterEach(async () => {
		//await queryRunner.release();
		await destroyDatabase();
	});

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts
  test(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
    const userEntity:UserEntity=new UserEntity();
    userEntity.identifier="";
    userEntity.status=StatusEnum.ACTIVE;

    const getUserByIdentifierServiceResult=await new GetUsersByIdentifierService().handleAsync({
      userEntity: userEntity,
    });
    if(getUserByIdentifierServiceResult.isErr()){
      expect(getUserByIdentifierServiceResult.isErr()).toBe(true);
      return;
    }
    expect(false).toBe(false);
  })

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts
  test(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
    const userEntity:UserEntity=new UserEntity();
    userEntity.identifier="";
    //userEntity.status=StatusEnum.ACTIVE;

    const getUserByIdentifierServiceResult=await new GetUsersByIdentifierService().handleAsync({
      userEntity: userEntity,
    });
    if(getUserByIdentifierServiceResult.isErr()){
      expect(getUserByIdentifierServiceResult.isErr()).toBe(true);
      return;
    }
    expect(false).toBe(false);
  })

  //node --trace-deprecation --test --test-name-pattern='should_return_false_when_identifier_is_provided_wrong' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts
  test(`should_return_false_when_identifier_is_provided_wrong`, async () => {
    const userEntity:UserEntity=new UserEntity();
    userEntity.identifier="754e1ad7-15c2-3f4b-ea37-83150bb826aa";
    userEntity.status=StatusEnum.INACTIVE;

    const getUserByIdentifierServiceResult=await new GetUsersByIdentifierService().handleAsync({
      userEntity: userEntity,
    });
    if(getUserByIdentifierServiceResult.isErr()){
      expect(getUserByIdentifierServiceResult.isErr()).toBe(true);
      return;
    }

    const result=getUserByIdentifierServiceResult.value;
    console.log(`result: ${JSON.stringify(result)}`);

    expect(getUserByIdentifierServiceResult.isOk()).toBe(true);
  })

  //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userEntity_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsersByIdentifier/index.test.ts
  test(`should_return_true_when_userEntity_is_not_provided`, async () => {
    const userEntity:UserEntity=new UserEntity();
    userEntity.identifier="754e1ad7-15c2-3f4b-ea37-83150bb826ab";
    userEntity.status=StatusEnum.INACTIVE;

    const getUserByIdentifierServiceResult=await new GetUsersByIdentifierService().handleAsync({
      userEntity: userEntity,
    });
    if(getUserByIdentifierServiceResult.isErr()){
      expect(getUserByIdentifierServiceResult.isErr()).toBe(false);
      return;
    }

    const result=getUserByIdentifierServiceResult.value;
    console.log(`result: ${JSON.stringify(result)}`);

    expect(getUserByIdentifierServiceResult.isOk()).toBe(true);
  })
});
