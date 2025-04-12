import { Column, Entity, Index, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { BoolEnum } from '../../../../../shared/models/enums/bool.enum';

@Entity({ schema: `user`, name: `usersSettings` })
export class UserSettingsEntity extends BaseEntity {

  @Column('varchar', { length: 50 })
  @IsNotEmpty()
  @IsUUID()
  @Index({ unique: true })
  public emailVerificationToken?: string;

  @Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isEmailVerified?: boolean;

  @Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isVerificationEmailSent?: boolean;

  @Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isWelcomeEmailSent?: boolean;

	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@OneToOne(() => UserEntity, (users) => users.userSetting, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
