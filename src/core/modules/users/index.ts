import { UserCommunicationEntity } from './infrastructures/entity/tUserCommunication';
import { UserCredentialsEntity } from './infrastructures/entity/tUserCredentials';
import { UserKeysEntity } from './infrastructures/entity/tUserKeys';
import { UserEntity } from './infrastructures/entity/tUsers';
import { UserSettingsEntity } from './infrastructures/entity/tUserSettings';

// Entity Db Datasource Register
export const userModuleDbDataSourceEntity: Function[] = [
	UserEntity,
	UserKeysEntity,
	UserCredentialsEntity,
	UserSettingsEntity,
	UserCommunicationEntity,
];

// Export Entity
export {
	UserEntity,
	UserKeysEntity,
	UserCredentialsEntity,
	UserSettingsEntity,
	UserCommunicationEntity,
};
