import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { BetsService } from '../bets/bets.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';
import { Bet } from '../bets/bet';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(
    private challengeSvc: ChallengesService,
    private betSvc: BetsService,
    private userSvc: UsersService,
  ) {}

  @Get('')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: Challenge,
    isArray: true,
  })
  getAll(@Query('showDeleted') showDeleted: boolean = false) {
    return this.challengeSvc.findAll(showDeleted);
  }

  @Get(':uuid')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  @ApiResponse({
    status: 404,
    description: 'Challange does not exist!',
  })
  getById(
    @Param('uuid', new ParseUUIDPipe()) challengeId: string,
    @Query('showDeleted') showDeleted: boolean = false,
  ) {
    const challenge = this.challengeSvc.findById(challengeId, showDeleted);
    if (!challenge) throw new NotFoundException('Challange does not exist!');
    return challenge;
  }

  @Get(':uuid/bets')
  @ApiOperation({ summary: 'get bets for a challenge' })
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: Bet,
    isArray: true
  })
  @ApiResponse({
    status: 404,
    description: 'Challange does not exist!',
  })
  getBersForChallenge(
    @Param('uuid', new ParseUUIDPipe()) challengeId: string,
    @Query('showDeleted') showDeleted: boolean = false,
  ) {
    return this.betSvc.filterBy('challenge', challengeId, showDeleted);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Challenge,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem',
  })
  create(@Body() challenge: CreateChallengeDto) {
    return this.challengeSvc.create(challenge);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary:
      'Partial update, only the sent keys that exist on the model will be used',
  })
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  partialUpdate(
    @Param('uuid', new ParseUUIDPipe()) challengeId: string,
    @Body() challenge: UpdateChallengeDto,
  ) {
    return this.challengeSvc.update(challenge, challengeId);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  @ApiResponse({
    status: 404,
    description: 'The user can not be found!',
  })
  delete(@Param('uuid', new ParseUUIDPipe()) challengeId: string) {
    return this.challengeSvc.remove(challengeId);
  }
}
