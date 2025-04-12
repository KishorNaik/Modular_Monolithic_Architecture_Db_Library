import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserCommunicationEntity } from '../tUserCommunication';
import { UserSettingsEntity } from '../tUserSettings';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsSafeString } from '../../../../../shared/utils/validations/decorators/isSafeString';
import { UserKeysEntity } from '../tUserKeys';

@Entity({ schema: `users`, name: `users` })
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
	@IsNotEmpty()
	@IsString()
	public clientId?: string;

	@OneToOne(() => UserCommunicationEntity, (userCommunication) => userCommunication.users)
	public userCommunication?: UserCommunicationEntity;

	@OneToOne(() => UserKeysEntity, (userKeysEntity) => userKeysEntity.users)
	public userKeys?: UserKeysEntity;

	@OneToOne(() => UserSettingsEntity, (userSettings) => userSettings.users)
	public userSetting?: UserSettingsEntity;
}
