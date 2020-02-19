import { Injectable } from '@nestjs/common';
import { EntityService } from '../common/entity.service';
import { Bet } from './bet';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { UsersService } from '../users/users.service';
import { ChallengesService } from '../challenges/challenges.service';

@Injectable()
export class BetsService extends EntityService<
  Bet,
  CreateBetDto,
  UpdateBetDto
> {
  constructor(
    private userSvc: UsersService,
    private challengeSvc: ChallengesService,
  ) {
    super('BetService', Bet);
  }

  create(data: CreateBetDto): Bet {
    const newBet = super.create(data);

    this.userSvc.addRelatedUuid(newBet.author, 'bets', newBet.id);
    this.challengeSvc.addRelatedUuid(newBet.challenge, 'bets', newBet.id);

    return newBet;
  }
}
