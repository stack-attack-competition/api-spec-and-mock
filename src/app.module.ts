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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChallengesModule,
    BetsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ImportExportModule,
    MockModule,
    PurgeModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
