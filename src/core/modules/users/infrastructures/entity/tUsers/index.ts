import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserCommunicationEntity } from '../tUserCommunication';
import { UserSettingsEntity } from '../tUserSettings';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsSafeString } from '../../../../../shared/utils/validations/decorators/isSafeString';
import { UserKeysEntity } from '../tUserKeys';
import { UserCredentialsEntity } from '../tUserCredentials';

@Entity({ schema: `user`, name: `users` })
export class UserEntity extends BaseEntity {
	@Column(`varchar`, { length: 100, nullable: false })
	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	public firstName?: string;

	@Column(`varchar`, { length: 100, nullable: false })
	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	public lastName?: string;

	@Column(`varchar`, { length: 255, nullable: false })
	@Index({ unique: true })
	@IsNotEmpty()
	@IsString()
  @IsUUID()
	public clientId?: string;

	@OneToOne(() => UserCommunicationEntity, (userCommunication) => userCommunication.users)
	public userCommunication?: UserCommunicationEntity;

	@OneToOne(() => UserKeysEntity, (userKeysEntity) => userKeysEntity.users)
	public userKeys?: UserKeysEntity;

	@OneToOne(() => UserSettingsEntity, (userSettings) => userSettings.users)
	public userSetting?: UserSettingsEntity;

	@OneToOne(() => UserCredentialsEntity, (userCredentials) => userCredentials.users)
	public userCredentials?: UserCredentialsEntity;
}
