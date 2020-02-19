import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MockModule } from './mock/mock.module';
import { ChallengesModule } from './challenges/challenges.module';
import { BetsModule } from './bets/bets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PurgeModule } from './purge/purge.module';
import { ImportExportModule } from './import-export/import-export.module';

@Module({
  imports: [
    UsersModule,
    ChallengesModule,
    BetsModule,
    MockModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    PurgeModule,
    ImportExportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
