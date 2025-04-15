import { Column, Entity, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsEmpty, IsNotEmpty, ValidateIf } from 'class-validator';

@Entity({ schema: `user`, name: `usersKeys` })
export class UserKeysEntity extends BaseEntity {
	@Column(`text`, { nullable: true })
	@ValidateIf((o) => o.refresh_token !== null && o.refresh_token !== undefined)
	@IsNotEmpty({ message: 'Refresh token must be a non-empty string' })
	public refresh_token?: string | null;

	@Column(`date`, { nullable: true })
	public refresh_Token_expires_at?: Date | null;

	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@Column('text', { nullable: true, unique: true })
	@IsNotEmpty()
	public aesSecretKey?: string;

	@Column('text', { nullable: true, unique: true })
	@IsNotEmpty()
	public hmacSecretKey?: string;

	@OneToOne(() => UserEntity, (users) => users.userKeys, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
