import { Service } from "typedi";
import { sealed } from "../../../../../../shared/utils/decorators/sealed";
import { IPageListResult, IPagination } from "../../../../../../shared/models/types/pagination";
import { ISort, Order } from "../../../../../../shared/models/types/order";
import { QueryRunner, SelectQueryBuilder } from "typeorm";
import { IServiceHandlerAsync } from "../../../../../../shared/utils/helpers/services";
import { UserEntity } from "../../../../infrastructures/entity/tUsers";
import { Ok, Result } from "neverthrow";
import { ResultError, ResultExceptionFactory } from "../../../../../../shared/utils/exceptions/results";
import { StatusCodes } from "http-status-codes";
import { dbDataSource } from "../../../../../../config/dbSource";
import { StatusEnum } from "../../../../../../shared/models/enums/status.enum";
import { PagedList } from "../../../../../../shared/utils/miscellaneous/pageList";
import { PaginationDataResponseModel } from "../../../../../../shared/models/response/data.Response";

export interface IGetUsersServiceParameters{
  pagination: IPagination;
  status:StatusEnum;
  filterBy?:{
    text:string
  }
  sortBy?:ISort
  queryRunner?:QueryRunner;
}

export interface IGetUsersService extends IServiceHandlerAsync<IGetUsersServiceParameters,IPageListResult<UserEntity>>{

}


@sealed
@Service()
export class GetUsersService implements IGetUsersService {

  public async handleAsync(params: IGetUsersServiceParameters): Promise<Result<IPageListResult<UserEntity>, ResultError>> {
    try
    {
      //@guard
      if(!params)
        return ResultExceptionFactory.error(StatusCodes.BAD_REQUEST,'Invalid Params');

      if(params.status===null || params.status===undefined)
        return ResultExceptionFactory.error(StatusCodes.BAD_REQUEST,"Invalid Status");

      if(!params.pagination)
        return ResultExceptionFactory.error(StatusCodes.BAD_REQUEST,'Invalid Pagination');

      const {pagination,filterBy,sortBy, status, queryRunner}=params;

      // Run Query Runner or Entity Manager
      const entityManger=queryRunner ? queryRunner.manager : dbDataSource.manager;

      // Create a Query Builder
      let queryBuilder:SelectQueryBuilder<UserEntity>=entityManger
      .createQueryBuilder(UserEntity,'user')
      .innerJoinAndSelect('user.userCommunication','userCommunication')
      .innerJoinAndSelect('user.userKeys','userKeys')
      .innerJoinAndSelect('user.userSetting','userSetting')
      .innerJoinAndSelect('user.userCredentials','userCredentials')
      .where('user.status = :status', {status});

      // Filter By (emailId, firstName, lastName, mobileNo and identifier)
      if(filterBy?.text){
        if(!filterBy.text)
            return ResultExceptionFactory.error(StatusCodes.BAD_REQUEST,'Invalid Filter By');

          // Filter By (emailId, firstName, lastName, mobileNo and identifier)
          queryBuilder=queryBuilder.andWhere(
            `(
              user.firstName ILIKE :firstName
              OR user.lastName ILIKE :lastName
              OR userCommunication.email ILIKE :emailId
              OR userCommunication.mobileNo ILIKE :mobileNo
              OR user.identifier ILIKE :identifier
              OR user.clientId ILIKE :clientId
            )
            `,
            {
              emailId:`%${filterBy.text}%`,
              firstName:`%${filterBy.text}%`,
              lastName:`%${filterBy.text}%`,
              mobileNo:`%${filterBy.text}%`,
              identifier:`%${filterBy.text}%`,
              clientId:`%${filterBy.text}%`
            }
          );
      }

      // Sort By
      if (sortBy && sortBy.by.length > 0) {
        sortBy.by.forEach((column) => {
          queryBuilder = queryBuilder.addOrderBy(
            `user.${column}`,
            sortBy.direction === Order.ASC ? 'ASC' : 'DESC'
          );
        });
      }

      // Pagination
      let pagedList: PagedList<UserEntity>;
      if (pagination) {
        pagedList = await PagedList.toPagedListAsync(
          queryBuilder,
          pagination.pageNumber,
          pagination.pageSize
        );
      } else {
        const allResults = await queryBuilder.getMany();
        pagedList = new PagedList(queryBuilder, allResults.length, 1, allResults.length);
      }

      const users=await pagedList.selectQueryBuilder.getMany();

      if(!users || users.length===0)
        return ResultExceptionFactory.error(StatusCodes.NOT_FOUND,`No Users Found`);

      const paginationModel:PaginationDataResponseModel=new PaginationDataResponseModel()
      paginationModel.currentPage=pagedList.currentPage;
      paginationModel.totalPages=pagedList.totalPages;
      paginationModel.pageSize=pagedList.pageSize;
      paginationModel.totalCount=pagedList.totalCount;
      paginationModel.hasPrevious=pagedList.hasPrevious;
      paginationModel.hasNext=pagedList.hasNext;

      const pageListResult: IPageListResult<UserEntity> = {
        items: users,
        page: paginationModel,
      };

      return new Ok(pageListResult);

    }
    catch(ex){
      const error=ex as Error;
      return ResultExceptionFactory.error(StatusCodes.INTERNAL_SERVER_ERROR,error.message);
    }
  }

}
