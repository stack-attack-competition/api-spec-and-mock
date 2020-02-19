import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MockModule } from './mock/mock.module';
import { ChallengesModule } from './challenges/challenges.module';
import { BetsModule } from './bets/bets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PurgeModule } from './purge/purge.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
