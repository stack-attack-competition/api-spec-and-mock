import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { BetsModule } from '../bets/bets.module';

@Module({
  imports: [UsersModule, ChallengesModule, BetsModule],
  controllers: [MockController]
})
export class MockModule {}
