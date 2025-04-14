import { Column, Entity, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsNotEmpty } from 'class-validator';

@Entity({ schema: `user`, name: `usersKeys` })
export class UserKeysEntity extends BaseEntity {
	@Column(`text`, { nullable: true, unique: true })
	@IsNotEmpty()
	public refresh_token?: string;

	@Column(`date`, { nullable: true })
	public refresh_Token_expires_at?: Date;

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
