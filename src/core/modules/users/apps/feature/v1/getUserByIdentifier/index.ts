import Container, { Service } from "typedi";
import { GetByIdentifierService } from "../../../../../../shared/services/db/getByIdentifer";
import { UserEntity } from "../../../../infrastructures/entity/tUsers";
import { sealed } from "../../../../../../shared/utils/decorators/sealed";
import { IServiceHandlerAsync } from "../../../../../../shared/utils/helpers/services";
import { Err, Ok, Result } from "neverthrow";
import { ResultError, ResultExceptionFactory } from "../../../../../../shared/utils/exceptions/results";
import { StatusCodes } from "http-status-codes";
import { QueryRunner } from "typeorm";
import { DtoValidation, IDtoValidation } from "../../../../../../shared/utils/validations/dto";
import { dbDataSource } from "../../../../../../config/dbSource";

export interface IGetUserByIdentifierServiceParameters{
  userEntity: UserEntity;
  queryRunner?: QueryRunner;
}

export interface IGetUserByIdentifierService extends IServiceHandlerAsync<IGetUserByIdentifierServiceParameters,UserEntity>{}

@sealed
@Service()
export class GetUsersByIdentifierService implements IGetUserByIdentifierService{

  private readonly dtoValidation: IDtoValidation<UserEntity>;

  public constructor() {
    this.dtoValidation = Container.get(DtoValidation<UserEntity>);
  }

  public async handleAsync(params: IGetUserByIdentifierServiceParameters): Promise<Result<UserEntity, ResultError>> {
    try
    {
      if ('identifier' in (params.userEntity as any) === false)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'Identifier is required'));

			if ('status' in (params.userEntity as any) === false)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'Status is required'));

			// Validate Entity
			const validationResult = await this.dtoValidation.handleAsync({
				dto: params.userEntity,
				dtoClass: (params.userEntity as any).constructor,
			});
			if (validationResult.isErr()) return new Err(validationResult.error);

			// Run Query Runner
			const entityManager = params.queryRunner ? params.queryRunner.manager : dbDataSource.manager;

      // Get Entity
			const result = await entityManager
      .createQueryBuilder(UserEntity, 'user')
      .innerJoinAndSelect('user.userCommunication', 'userCommunication')
      .innerJoinAndSelect('user.userKeys', 'userKeys')
      .innerJoinAndSelect('user.userSetting', 'userSetting')
      .innerJoinAndSelect('user.userCredentials', 'userCredentials')
      .where('user.identifier = :identifier', {
        identifier: params.userEntity.identifier,
      })
      .andWhere('user.status = :status', {
        status: params.userEntity.status,
      })
      .getOne();

      // Check if get is successfully
			if (!result) return new Err(new ResultError(StatusCodes.NOT_FOUND, 'entity not found'));

			// Get Entity
			return new Ok(result);
    }
    catch(ex){
      const error =ex as Error;
      return ResultExceptionFactory.error(StatusCodes.INTERNAL_SERVER_ERROR,error.message);
    }
  }
}
