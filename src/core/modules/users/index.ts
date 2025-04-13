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

// User Module
export * from '../users/infrastructures/entity/tUserCommunication';
export * from '../users/infrastructures/entity/tUsers';
export * from '../users/infrastructures/entity/tUserSettings';
export * from '../users/infrastructures/entity/tUserKeys';
export * from '../users/infrastructures/entity/tUserCredentials';

export * from '../users/apps/feature/v1/addUsers';
export * from '../users/apps/feature/v1/getUserByIdentifier';
export * from '../users/apps/feature/v1/getVersion';
