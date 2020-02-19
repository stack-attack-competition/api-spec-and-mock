import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './challenge';
import { EntityService } from '../common/entity.service';
import { Bet } from '../bets/bet';
import { CreateBetDto } from '../bets/dto/create-bet.dto';
import { UpdateBetDto } from '../bets/dto/update-bet.dto';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class ChallengesService extends EntityService<
  Challenge,
  CreateChallengeDto,
  UpdateChallengeDto
> {
  constructor(private userSvc: UsersService) {
    super('ChallengeService', Challenge);
  }

  create(data: CreateChallengeDto) {
    const author = this.userSvc.findById(data.author);
    if (!author)
      throw new BadRequestException('Original author does not exist!');

    const newChallenge = super.create(data);

    this.userSvc.addRelatedUuid(
      newChallenge.author,
      'challenges',
      newChallenge.id,
    );

    return newChallenge;
  }

  update(data: UpdateChallengeDto, uuid: string): Challenge {
    const originalChallenge = this.findById(uuid);
    if (!originalChallenge)
      throw new NotFoundException('The existing challenge was not found!');

    const updatedChallenge = super.update(data, uuid);

    if (updatedChallenge.author !== originalChallenge.author) {
      this.userSvc.addRelatedUuid(
        updatedChallenge.author,
        'challenges',
        updatedChallenge.id,
      );

      this.userSvc.removeRelatedUuid(
        originalChallenge.author,
        'challenges',
        originalChallenge.id,
      );
    }

    return updatedChallenge;
  }
}
