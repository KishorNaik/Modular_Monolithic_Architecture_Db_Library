import { Column, Entity, Index, JoinColumn, OneToOne, ViewColumn } from 'typeorm';
import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({ schema: 'users', name: `usersCommunication` })
export class UserCommunicationEntity extends BaseEntity {
	@Column(`varchar`, { length: 100, nullable: false })
	@Index({ unique: true })
	@IsNotEmpty()
	@IsEmail()
	public email?: string;

  @Column(`varchar`, {nullable: false })
	@Index({ unique: true })
	@IsNotEmpty()
	@IsEmail()
  public mobileNo?:string

	@ViewColumn({ name: 'userId' })
	public userId?: string;

	@OneToOne(() => UserEntity, (users) => users.userCommunication, { cascade: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'identifier' })
	public users?: UserEntity;
}
