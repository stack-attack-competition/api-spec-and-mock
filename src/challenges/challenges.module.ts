import { forwardRef, Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { UsersModule } from '../users/users.module';
import { BetsModule } from '../bets/bets.module';

@Module({
  imports: [forwardRef(() => UsersModule), BetsModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
