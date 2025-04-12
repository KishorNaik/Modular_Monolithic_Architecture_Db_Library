import Container, { Service } from 'typedi';
import { AddService } from '../../../../../../shared/services/db/add';
import { UserEntity } from '../../../../infrastructures/entity/tUsers';
import { UserCommunicationEntity } from '../../../../infrastructures/entity/tUserCommunication';
import { UserKeysEntity } from '../../../../infrastructures/entity/tUserKeys';
import { UserSettingsEntity } from '../../../../infrastructures/entity/tUserSettings';

Container.set<AddService<UserEntity>>(
	AddService<UserEntity>,
	new AddService<UserEntity>(UserEntity)
);
Container.set<AddService<UserCommunicationEntity>>(
	AddService<UserCommunicationEntity>,
	new AddService<UserCommunicationEntity>(UserCommunicationEntity)
);
Container.set<AddService<UserKeysEntity>>(
	AddService<UserKeysEntity>,
	new AddService<UserKeysEntity>(UserKeysEntity)
);
Container.set<AddService<UserSettingsEntity>>(
	AddService<UserSettingsEntity>,
	new AddService<UserSettingsEntity>(UserSettingsEntity)
);

@Service()
export class AddUserService extends AddService<UserEntity> {
	public constructor() {
		super(UserEntity);
	}
}

@Service()
export class AddUserCommunicationService extends AddService<UserCommunicationEntity> {
	public constructor() {
		super(UserCommunicationEntity);
	}
}

@Service()
export class AddUserKeyService extends AddService<UserKeysEntity> {
	public constructor() {
		super(UserKeysEntity);
	}
}

@Service()
export class AddUserSettingsService extends AddService<UserSettingsEntity> {
	public constructor() {
		super(UserSettingsEntity);
	}
}
