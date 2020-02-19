import { Module } from '@nestjs/common';
import { PurgeController } from './purge.controller';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { BetsModule } from '../bets/bets.module';

@Module({
  imports: [UsersModule, ChallengesModule, BetsModule],
  controllers: [PurgeController]
})
export class PurgeModule {}
