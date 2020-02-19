import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user';
import * as Chance from 'chance';
import { Challenge } from '../challenges/challenge';
import { Bet } from '../bets/bet';
import { UsersService } from '../users/users.service';
import { ChallengesService } from '../challenges/challenges.service';
import { GetDbDto } from './dto/get-db.dto';

const chance = new Chance();

@ApiTags('__UTIL__ mock')
@Controller('mock')
export class MockController {
  @Get('db')
  getMockDb(@Query() getDbDto: GetDbDto) {
    const userSvc = new UsersService();
    const challengeSvc = new ChallengesService(userSvc);

    const users = chance
      .n(() => User.getMockOne(true), +getDbDto.userCount)
      .map(u => userSvc.create(u));
    const userIds = users.map(u => u.id);

    const challenges = Challenge.getMockMany(+getDbDto.challengeCount)
      .map(c => {
        const randomUserId =
          userIds[chance.integer({ min: 0, max: userIds.length - 1 })];
        c.author = randomUserId;
        c.bets = [];
        userSvc.addRelatedUuid(randomUserId, 'challenges', c.id);
        return c;
      })
      .map(c => challengeSvc.create(c));
    const challengeIds = challenges.map(c => c.id);

    const bets = Bet.getMockMany(+getDbDto.betCount).map(b => {
      const randomUserId =
        userIds[chance.integer({ min: 0, max: userIds.length - 1 })];
      const randomChallengeId =
        challengeIds[chance.integer({ min: 0, max: challengeIds.length - 1 })];

      b.author = randomUserId;
      userSvc.addRelatedUuid(randomUserId, 'bets', b.id);

      b.challenge = randomChallengeId;
      challengeSvc.addRelatedUuid(randomChallengeId, 'bets', b.id);

      return b;
    });

    return {
      users,
      challenges,
      bets,
    };
  }

  @Get('users')
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  getMockUsers() {
    return User.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('new-user')
  @ApiResponse({
    status: 200,
    type: User,
  })
  getMockNewUser() {
    return User.getMockOne(true);
  }

  @Get('existing-user')
  @ApiResponse({
    status: 200,
    type: User,
  })
  getExistingUsers() {
    return User.getMockOne();
  }

  @Get('challenges')
  @ApiResponse({
    status: 200,
    type: Challenge,
    isArray: true,
  })
  getMockChallenges() {
    return Challenge.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('active-challenge')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  getMockActiveChallenge() {
    return Challenge.getMockOne(true);
  }

  @Get('closed-challenge')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  getClosedChallenge() {
    return Challenge.getMockOne(false);
  }

  @Get('bets')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  getMockBets() {
    return Bet.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('active-bet')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  getMockActiveBet() {
    return Bet.getMockOne(true);
  }

  @Get('closed-bet')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  getMockClosedBet() {
    return Bet.getMockOne(false);
  }
}
