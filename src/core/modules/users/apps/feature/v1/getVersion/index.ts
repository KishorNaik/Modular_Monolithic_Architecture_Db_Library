import Container, { Service } from "typedi";
import { sealed } from "../../../../../../shared/utils/decorators/sealed";
import { GetByVersionIdentifierService } from "../../../../../../shared/services/db/getVersion";
import { UserEntity } from "../../../../infrastructures/entity/tUsers";

Container.set<GetByVersionIdentifierService<UserEntity>>(GetByVersionIdentifierService<UserEntity>,new GetByVersionIdentifierService<UserEntity>(UserEntity));

@sealed
@Service()
export class GetUserRowVersionService extends GetByVersionIdentifierService<UserEntity>{
  public constructor()
  {
    super(UserEntity);
  }
}
