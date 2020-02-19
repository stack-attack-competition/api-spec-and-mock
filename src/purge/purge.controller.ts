import { Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { ChallengesService } from '../challenges/challenges.service';
import { BetsService } from '../bets/bets.service';

@ApiTags('__UTIL__ purge')
@Controller('purge')
export class PurgeController {
  constructor(
    private userSvc: UsersService,
    private challengeSvc: ChallengesService,
    private betSvc: BetsService,
  ) {}

  @Delete('db')
  purgeDb() {
    return [
      this.userSvc.removeAll(),
      this.challengeSvc.removeAll(),
      this.betSvc.removeAll(),
    ];
  }

  @Delete('users')
  purgeAllUSers() {
    return this.userSvc.removeAll();
  }
  @Delete('challenges')
  purgeAllChallenges() {
    return this.challengeSvc.removeAll();
  }
  @Delete('bets')
  purgeAllBets() {
    return this.betSvc.removeAll();
  }
}
