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
import { BetsService } from './bets.service';
import { Bet } from './bet';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@ApiTags('bets')
@Controller('bets')
export class BetsController {
  constructor(private betSvc: BetsService) {}

  @Get('')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: Bet,
    isArray: true,
  })
  getAll(@Query('showDeleted') showDeleted: boolean = false) {
    return this.betSvc.findAll(showDeleted);
  }

  @Get(':uuid')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: Bet,
  })
  @ApiResponse({
    status: 404,
    description: 'Bet does not exist!',
  })
  getById(
    @Param('uuid', new ParseUUIDPipe()) betId: string,
    @Query('showDeleted') showDeleted: boolean = false,
  ) {
    const bet = this.betSvc.findById(betId, showDeleted);
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
  create(@Body() bet: CreateBetDto) {
    return this.betSvc.create(bet);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary:
      'Partial update, only the sent keys that exist on the model will be used',
  })
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
    @Body() bet: UpdateBetDto,
  ) {
    return this.betSvc.update(bet, betId);
  }

  @Delete(':uuid')
  @ApiOperation({summary: 'soft delete'})
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
