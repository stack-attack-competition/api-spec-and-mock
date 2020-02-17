import { Injectable } from '@nestjs/common';
import { EntityService } from '../common/entity.service';
import { Bet } from './bet';
import { UpsertBetDto } from './dto/upsert-bet.dto';
import { PatchBetDto } from './dto/patch-bet.dto';

@Injectable()
export class BetsService extends EntityService<Bet, UpsertBetDto, PatchBetDto> {
  constructor() {
    super('BetService', Bet);
  }
}
