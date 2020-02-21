import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ChallengesModule } from '../challenges/challenges.module';
import { BetsModule } from '../bets/bets.module';

@Module({
  imports: [forwardRef(() => ChallengesModule), BetsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
