import { User } from '../users/user';
import { Challenge } from '../challenges/challenge';
import { Bet } from '../bets/bet';
import { ApiProperty } from '@nestjs/swagger';

export class DbDto {
  @ApiProperty()
  users: User[];

  @ApiProperty()
  challenges: Challenge[];

  @ApiProperty()
  bets: Bet[];
}
