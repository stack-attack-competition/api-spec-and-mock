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
import { BetsService } from './bets.service';
import { Bet } from './bet';
import { UpsertBetDto } from './dto/upsert-bet.dto';
import { PatchBetDto } from './dto/patch-bet.dto';

@ApiTags('bets')
@Controller('bets')
export class BetsController {
  constructor(private betSvc: BetsService) {
  }

  @Get('')
  @ApiResponse({
    status: 200,
    type: Bet,
    isArray: true,
  })
  getAll() {
    return this.betSvc.findAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 404,
    description: 'Bet does not exist!',
  })
  getById(@Param('uuid', new ParseUUIDPipe()) BetId: string) {
    const bet = this.betSvc.findById(BetId);
    if (!bet) throw new NotFoundException('Bet does not exist!');
    return bet;
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem',
  })
  create(@Body() bet: UpsertBetDto) {
    return this.betSvc.upsert(bet);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Whole object replace'})
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  update(
    @Param('uuid', new ParseUUIDPipe()) betId: string,
    @Body() bet: UpsertBetDto,
  ) {
    return this.betSvc.upsert(bet, betId);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Partial update, only the sent keys that exist on the model will be used'})
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  partialUpdate(
    @Param('uuid', new ParseUUIDPipe()) betId: string,
    @Body() bet: PatchBetDto,
  ) {
    return this.betSvc.upsert(bet, betId);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 404,
    description: 'The bet can not be found!',
  })
  delete(@Param('uuid', new ParseUUIDPipe()) betId: string) {
    return this.betSvc.remove(betId);
  }
}
