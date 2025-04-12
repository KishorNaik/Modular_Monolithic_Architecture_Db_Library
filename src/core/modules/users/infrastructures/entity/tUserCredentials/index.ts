import { BaseEntity } from '../../../../../shared/entity/base';
import { Column, Entity, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { UserEntity } from '../tUsers';

@Entity({ schema: `users`, name: `usersSettings` })
export class UserCredentialsEntity extends BaseEntity {
	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@OneToOne(() => UserEntity, (users) => users.userSetting, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
