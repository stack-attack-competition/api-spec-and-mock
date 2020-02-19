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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private challengeSvc: ChallengesService) {}

  @Get('')
  @ApiResponse({
    status: 200,
    type: Challenge,
    isArray: true,
  })
  getAll() {
    return this.challengeSvc.findAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  @ApiResponse({
    status: 404,
    description: 'Challange does not exist!',
  })
  getById(@Param('uuid', new ParseUUIDPipe()) challengeId: string) {
    const challenge = this.challengeSvc.findById(challengeId);
    if (!challenge) throw new NotFoundException('Challange does not exist!');
    return challenge;
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
