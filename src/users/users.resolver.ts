import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersSvc: UsersService) {}

  @Query(returns => [User])
  getAll() {
    return this.usersSvc.findAll();
  }
}
