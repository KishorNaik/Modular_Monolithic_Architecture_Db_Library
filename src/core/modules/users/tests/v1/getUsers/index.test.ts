import test, { afterEach, beforeEach, describe } from 'node:test';
import expect from 'expect';
import { QueryRunner } from 'typeorm';
import {
	destroyDatabase,
	getQueryRunner,
	initializeDatabase,
} from '../../../../../config/dbSource';
import { StatusEnum } from '../../../../../shared/models/enums/status.enum';
import { GetUsersService, IGetUsersServiceParameters } from '../../../apps/feature/v1/getUsers';
import { getPropertyNameByType } from '../../../../../shared/utils/miscellaneous/getPropertyName';
import { UserEntity } from '../../../infrastructures/entity/tUsers';
import { Order } from '../../../../../shared/models/types/order';

// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts

// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts

// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts

describe(`Get Users Unit Test`, () => {
	beforeEach(async () => {
		await initializeDatabase();
		//queryRunner = getQueryRunner();
	});

	afterEach(async () => {
		//await queryRunner.release();
		await destroyDatabase();
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_only_pagination_object_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_only_pagination_object_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			status: StatusEnum.ACTIVE,
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_sort_object_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_sort_object_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_false_when_filter_with_empty_text_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_empty_text_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: '',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_false_when_filter_with_wrong_text_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_false_when_filter_with_wrong_text_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: 'Hello World',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_firstName_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_firstName_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: 'eshaan',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_lastName_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_lastName_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: 'naik',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_emailId_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_emailId_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: 'eshaan.naik.dev62@gmail.com',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_mobileNo_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_mobileNo_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: '9167791162',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_identifier_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_identifier_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: 'e30ff63e-caa1-5dc0-99a5-504f14e55317',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});

	//node --trace-deprecation --test --test-name-pattern='should_return_true_when_filter_with_clientId_is_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getUsers/index.test.ts
	test(`should_return_true_when_filter_with_clientId_is_provided`, async () => {
		const parameters: IGetUsersServiceParameters = {
			status: StatusEnum.ACTIVE,
			pagination: {
				pageNumber: 1,
				pageSize: 10,
			},
			sortBy: {
				by: [
					getPropertyNameByType<UserEntity>('created_date'),
					getPropertyNameByType<UserEntity>('modified_date'),
				],
				direction: Order.DESC,
			},
			filterBy: {
				text: '006dbdfb-0f56-42ae-2b1d-9c0e1adb4979',
			},
		};

		const getUsersServiceResult = await new GetUsersService().handleAsync(parameters);
		if (getUsersServiceResult.isErr()) {
			expect(getUsersServiceResult.isErr()).toBe(true);
			return;
		}
		expect(getUsersServiceResult.isOk()).toBe(true);
	});
});
