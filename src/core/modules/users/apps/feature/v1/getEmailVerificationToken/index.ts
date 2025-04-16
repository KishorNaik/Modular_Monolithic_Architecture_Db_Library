import Container, { Service } from 'typedi';
import { sealed } from '../../../../../../shared/utils/decorators/sealed';
import { QueryRunner } from 'typeorm';
import { IServiceHandlerAsync } from '../../../../../../shared/utils/helpers/services';
import { Err, Ok, Result } from 'neverthrow';
import {
	ResultError,
	ResultExceptionFactory,
} from '../../../../../../shared/utils/exceptions/results';
import { UserSettingsEntity } from '../../../../infrastructures/entity/tUserSettings';
import { StatusCodes } from 'http-status-codes';
import { DtoValidation, IDtoValidation } from '../../../../../../shared/utils/validations/dto';
import { dbDataSource } from '../../../../../../config/dbSource';

export interface IGetEmailVerificationTokenServiceParameters {
	userSettingsEntity: UserSettingsEntity;
	queryRunner?: QueryRunner;
}

export interface IGetEmailVerificationTokenService
	extends IServiceHandlerAsync<IGetEmailVerificationTokenServiceParameters, UserSettingsEntity> {}

@sealed
@Service()
export class GetEmailVerificationTokenService implements IGetEmailVerificationTokenService {
	private readonly dtoValidation: IDtoValidation<UserSettingsEntity>;

	public constructor() {
		this.dtoValidation = Container.get(DtoValidation<UserSettingsEntity>);
	}

	public async handleAsync(
		params: IGetEmailVerificationTokenServiceParameters
	): Promise<Result<UserSettingsEntity, ResultError>> {
		try {
			if (!params)
				return ResultExceptionFactory.error(StatusCodes.BAD_REQUEST, 'Invalid Params');

			if (!params.userSettingsEntity)
				return ResultExceptionFactory.error(
					StatusCodes.BAD_REQUEST,
					'Invalid user setting entity'
				);

			if ('status' in (params.userSettingsEntity as any) === false)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'Status is required'));

			// Validate Entity
			const validationResult = await this.dtoValidation.handleAsync({
				dto: params.userSettingsEntity,
				dtoClass: (params.userSettingsEntity as any).constructor,
			});
			if (validationResult.isErr()) return new Err(validationResult.error);

			// Run Query Runner
			const entityManager = params.queryRunner
				? params.queryRunner.manager
				: dbDataSource.manager;

			const result = await entityManager
				.createQueryBuilder(UserSettingsEntity, 'userSettings')
				.where('userSettings.emailVerificationToken = :emailVerificationToken', {
					emailVerificationToken: params.userSettingsEntity.emailVerificationToken,
				})
				.andWhere('userSettings.status = :status', {
					status: params.userSettingsEntity.status,
				})
				.getOne();

			// Check if get is successfully
			if (!result) return new Err(new ResultError(StatusCodes.NOT_FOUND, 'entity not found'));

			// Get Entity
			return new Ok(result);
		} catch (ex) {
			const error = ex as Error;
			return ResultExceptionFactory.error(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
		}
	}
}
