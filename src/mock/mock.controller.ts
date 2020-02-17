import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user';
import * as Chance from 'chance';
import { Challenge } from '../challenges/challenge';
import { Bet } from '../bets/bet';
const chance = new Chance();

@ApiTags('__UTIL__ mock')
@Controller('mock')
export class MockController {
  // @Get('db')
  // getDb() {}

  @Get('users')
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  getUsers() {
    return User.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('new-user')
  @ApiResponse({
    status: 200,
    type: User,
  })
  getNewUser() {
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
  getChallenges() {
    return Challenge.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('active-challenge')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  getActiveChallenge() {
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
  getBets() {
    return Bet.getMockMany(chance.integer({ min: 3, max: 150 }));
  }

  @Get('active-bet')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  getActiveBet() {
    return Bet.getMockOne(true);
  }
  @Get('closed-bet')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  getClosedBet() {
    return Bet.getMockOne(false);
  }
}
