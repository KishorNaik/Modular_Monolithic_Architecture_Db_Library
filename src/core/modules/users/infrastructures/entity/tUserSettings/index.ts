import { Column, Entity, Index, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsBoolean, IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { BoolEnum } from '../../../../../shared/models/enums/bool.enum';

@Entity({ schema: `user`, name: `usersSettings` })
export class UserSettingsEntity extends BaseEntity {
	@Column('varchar', { length: 50, nullable: true })
	@ValidateIf((o) => o.emailVerificationToken !== null && o.emailVerificationToken !== undefined)
	@IsNotEmpty({ message: 'emailVerification token must be a non-empty string' })
	@IsUUID()
	public emailVerificationToken?: string | null;

  @Column(`date`, { nullable: true })
	public email_Verification_Token_expires_at?: Date | null;

	@Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isEmailVerified?: BoolEnum;

	@Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isVerificationEmailSent?: BoolEnum;

	@Column('enum', { enum: BoolEnum, default: BoolEnum.NO })
	public isWelcomeEmailSent?: BoolEnum;

	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@OneToOne(() => UserEntity, (users) => users.userSetting, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
