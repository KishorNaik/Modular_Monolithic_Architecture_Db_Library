import Container, { Service } from 'typedi';
import { sealed } from '../../../../../../shared/utils/decorators/sealed';
import { UpdateService } from '../../../../../../shared/services/db/update';
import { UserEntity } from '../../../../infrastructures/entity/tUsers';

Container.set(UpdateService<UserEntity>, new UpdateService<UserEntity>(UserEntity));

@sealed
@Service()
export class UpdateUserVersionService extends UpdateService<UserEntity> {
	public constructor() {
		super(UserEntity);
	}
}
