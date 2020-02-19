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
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge';
import { UpsertChallengeDto } from './dto/upsert-challenge.dto';
import { PatchChallengeDto } from './dto/patch-challenge.dto';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private challengeSvc: ChallengesService) {
  }

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
  create(@Body() challenge: UpsertChallengeDto) {
    return this.challengeSvc.upsert(challenge);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Whole object replace'})
  @ApiResponse({
    status: 200,
    type: Challenge,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  update(
    @Param('uuid', new ParseUUIDPipe()) challengeId: string,
    @Body() challenge: UpsertChallengeDto,
  ) {
    return this.challengeSvc.upsert(challenge, challengeId);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Partial update, only the sent keys that exist on the model will be used'})
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
    @Body() challenge: PatchChallengeDto,
  ) {
    return this.challengeSvc.upsert(challenge, challengeId);
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
