import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/user';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  users: User[] = [];

  findAllUsers(): User[] {
    return this.users;
  }

  findUserById(uuid: string) {
    return this.users.find(u => u.id === uuid);
  }

  upsertUser(user: UpsertUserDto | PatchUserDto, userId?: string) {
    const emailCheck = this.users.filter(u => user.email);
    if (
      (!user.email && emailCheck.length >= 1) || // on user create there should not be the same email in the db
      (user.email && emailCheck.length !== 1) // on user update there should be one and only one email in the db
    )
      throw new ConflictException(
        'This email address is already being used. Email addresses must be unique!',
      );

    if (!userId) {
      // create

      const newUser = new User(user);
      this.users.push(newUser);
      return newUser;
    } else {
      // update

      const existingUserIndex = this.findUserIndex(userId);

      if (!existingUserIndex)
        throw new NotFoundException('Existing user is not found!');

      const updatedUser = new User({
        ...this.findUserById(userId),
        ...user,
      });

      this.users[existingUserIndex] = updatedUser;
      return updatedUser;
    }
  }

  removeUser(userId: string) {
    const existingUserIndex = this.findUserIndex(userId);
    if (!existingUserIndex)
      throw new NotFoundException('Existing user is not found!');

    const deletedUser = this.users.splice(existingUserIndex);

    return deletedUser[0];
  }

  private findUserIndex(userId: string) {
    return this.users.findIndex(u => u.id === userId);
  }
}
