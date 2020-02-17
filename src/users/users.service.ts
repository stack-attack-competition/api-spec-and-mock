import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  data: User[] = [];

  findAll(): User[] {
    return this.data;
  }

  findById(uuid: string) {
    return this.data.find(u => u.id === uuid);
  }

  findIndexById(uuid: string) {
    return this.data.findIndex(d => d.id === uuid);
  }

  upsert(data: UpsertUserDto | PatchUserDto, uuid?: string) {
    const emailCheck = this.data.filter(u => data.email);
    if (
      (!data.email && emailCheck.length >= 1) || // on user create there should not be the same email in the db
      (data.email && emailCheck.length !== 1) // on user update there should be one and only one email in the db
    )
      throw new ConflictException(
        'This email address is already being used. Email addresses must be unique!',
      );

    if (!uuid) {
      // create

      const newRecord = new User(data);
      this.data.push(newRecord);
      return newRecord;
    } else {
      // update

      const existingRecordIndex = this.findIndexById(uuid);

      if (!existingRecordIndex)
        throw new NotFoundException('Existing user is not found!');

      const updatedRecord = new User({
        ...this.findById(uuid),
        ...data,
      });

      this.data[existingRecordIndex] = updatedRecord;
      return updatedRecord;
    }
  }

  remove(uuid: string) {
    const existingRecordIndex = this.findIndexById(uuid);
    if (!existingRecordIndex)
      throw new NotFoundException('Existing record is not found!');

    const deletedRecords = this.data.splice(existingRecordIndex);

    return deletedRecords[0];
  }
}
