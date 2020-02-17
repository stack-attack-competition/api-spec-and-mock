import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MockModule } from './mock/mock.module';
import { ChallengesModule } from './challenges/challenges.module';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [UsersModule, ChallengesModule, BetsModule, MockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
