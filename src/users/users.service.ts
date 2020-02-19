import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { EntityService } from '../common/entity.service';

@Injectable()
export class UsersService extends EntityService<User,
  UpsertUserDto,
  PatchUserDto> {
  constructor() {
    super('UserService', User);
  }

  upsert(data: UpsertUserDto | PatchUserDto, uuid?: string) {
    const emailCheck = this.filterBy('email', data.email);

    if (
      (!uuid && emailCheck.length >= 1) || // on user create there should not be the same email in the db
      (uuid && emailCheck.length !== 1) // on user update there should be one and only one email in the db
    )
      throw new ConflictException(
        'This email address is already being used. Email addresses must be unique!',
      );

    return super.upsert(data, uuid);
  }
}
