import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertChallengeDto } from './dto/upsert-challenge.dto';
import { PatchChallengeDto } from './dto/patch-challenge.dto';
import { Challenge } from './challenge';
import { EntityService } from '../common/entity.service';
import { Bet } from '../bets/bet';
import { UpsertBetDto } from '../bets/dto/upsert-bet.dto';
import { PatchBetDto } from '../bets/dto/patch-bet.dto';

@Injectable()
export class ChallengesService extends EntityService<
  Challenge,
  UpsertChallengeDto,
  PatchChallengeDto
> {
  constructor() {
    super('ChallengeService', Challenge);
  }
}
