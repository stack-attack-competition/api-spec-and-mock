import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './challenge';
import { EntityService } from '../common/entity.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChallengesService extends EntityService<Challenge,
  CreateChallengeDto,
  UpdateChallengeDto> {
  constructor(private userSvc: UsersService) {
    super('ChallengeService', Challenge);
  }

  create(data: CreateChallengeDto) {
    const author = this.userSvc.findById(data.author);
    if (!author)
      throw new BadRequestException('Original author does not exist!');

    return super.create(data);
  }
}
