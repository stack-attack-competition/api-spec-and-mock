import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/models/user';
import * as Chance from 'chance';
const chance = new Chance();

@ApiTags('mock')
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
    return User.getMockMany(chance.integer({min: 3, max: 150}))
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
  // @Get('challanges')
  // getChallanges() {}
  // @Get('bids')
  // getBids()
}
