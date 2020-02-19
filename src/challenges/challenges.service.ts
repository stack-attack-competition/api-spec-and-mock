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

  update(
    data: CreateChallengeDto | UpdateChallengeDto,
    uuid?: string,
  ): Challenge {
    if (!uuid) {
      const updatedChallenge = super.update(data);

      const author = this.userSvc.findById(updatedChallenge.author);
      if (!author)
        throw new BadRequestException('Original author does not exist!');

      this.userSvc.addRelatedUuid(
        updatedChallenge.author,
        'challenges',
        updatedChallenge.id,
      );

      return updatedChallenge;
    } else {
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
    }
  }
}
