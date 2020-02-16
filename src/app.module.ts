import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [UsersModule, MockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
