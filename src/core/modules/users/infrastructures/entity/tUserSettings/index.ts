import { Column, Entity, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsBoolean } from 'class-validator';

@Entity({ schema: `users`, name: `usersSettings` })
export class UserSettingsEntity extends BaseEntity {
	@Column(`bool`, { default: false })
	@IsBoolean()
	public isEmailVerified?: boolean;

  @Column("bool", { default:false})
  public isWelcomeEmailSent?: boolean;

	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@OneToOne(() => UserEntity, (users) => users.userSetting, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
