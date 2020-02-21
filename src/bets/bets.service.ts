import { Injectable } from '@nestjs/common';
import { EntityService } from '../common/entity.service';
import { Bet } from './bet';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Injectable()
export class BetsService extends EntityService<
  Bet,
  CreateBetDto,
  UpdateBetDto
> {
  constructor() {
    super('BetService', Bet);
  }
}
