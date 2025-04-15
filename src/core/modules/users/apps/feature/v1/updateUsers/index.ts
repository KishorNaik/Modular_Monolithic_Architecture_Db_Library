import Container, { Service } from "typedi";
import { sealed} from "../../../../../../shared/utils/decorators/sealed";
import { UpdateService } from "../../../../../../shared/services/db/update";
import { UserEntity } from "../../../../infrastructures/entity/tUsers";
import { UserCommunicationEntity } from "../../../../infrastructures/entity/tUserCommunication";
import { UserCredentialsEntity } from "../../../../infrastructures/entity/tUserCredentials";
import { UserKeysEntity } from "../../../../infrastructures/entity/tUserKeys";
import { UserSettingsEntity } from "../../../../infrastructures/entity/tUserSettings";

Container.set<UpdateService<UserEntity>>(UpdateService<UserEntity>,new UpdateService<UserEntity>(UserEntity));
Container.set<UpdateService<UserCommunicationEntity>>(UpdateService<UserCommunicationEntity>,new UpdateService<UserCommunicationEntity>(UserCommunicationEntity));
Container.set<UpdateService<UserCredentialsEntity>>(UpdateService<UserCredentialsEntity>, new UpdateService<UserCredentialsEntity>(UserCredentialsEntity));
Container.set<UpdateService<UserKeysEntity>>(UpdateService<UserKeysEntity>,new UpdateService<UserKeysEntity>(UserKeysEntity));
Container.set<UpdateService<UserSettingsEntity>>(UpdateService<UserSettingsEntity>, new UpdateService<UserSettingsEntity>(UserSettingsEntity));

@sealed
@Service()
export class UpdateUserService extends UpdateService<UserEntity>{
  public constructor(){
    super(UserEntity);
  }
}

@sealed
@Service()
export class UpdateUserCommunicationService extends UpdateService<UserCommunicationEntity> {
  public constructor(){
    super(UserCommunicationEntity)
  }
}

@sealed
@Service()
export class UpdateUserCredentialsService extends UpdateService<UserCredentialsEntity> {
  public constructor(){
    super(UserCredentialsEntity)
  }
}

@sealed
@Service()
export class UpdateUserKeysService extends UpdateService<UserKeysEntity>{
  public constructor(){
    super(UserKeysEntity)
  }
}

@sealed
@Service()
export class UpdateUserSettingsService extends UpdateService<UserSettingsEntity>{
  public constructor(){
    super(UserSettingsEntity)
  }
}
