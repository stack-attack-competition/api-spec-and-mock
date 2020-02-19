import { Module } from '@nestjs/common';
import { ImportExportController } from './import-export.controller';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { BetsModule } from '../bets/bets.module';

@Module({
  imports: [UsersModule, ChallengesModule, BetsModule],
  controllers: [ImportExportController]
})
export class ImportExportModule {}
