import { Module } from '@nestjs/common';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [UsersModule, ChallengesModule],
  controllers: [BetsController],
  providers: [BetsService],
  exports: [BetsService],
})
export class BetsModule {}
