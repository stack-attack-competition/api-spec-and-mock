import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';
import * as _ from 'lodash';

const chance = new Chance();

export class Bet {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  author: string;

  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  challenge: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsBoolean()
  inFavor: boolean;

  @ApiProperty({
    example: chance.integer({ min: 5, max: 500 }),
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: chance.integer({ min: 5, max: 500 }),
  })
  @IsNumber()
  @IsOptional()
  result?: number;

  constructor(bet: Partial<Bet>) {
    Object.assign(this, _.pickBy(bet, _.identity));
    if (!bet.id) this.id = chance.guid();
  }

  static factory(data: Partial<Bet>): Bet {
    return new Bet(data);
  }

  static getMockOne(
    isActive: boolean = chance.bool(),
    inFavor: boolean = chance.bool(),
    challenge: string = chance.guid(),
    author: string = chance.guid(),
  ): Bet {
    const activeBetMock = {
      id: chance.guid(),
      author,
      challenge,
      inFavor,
      amount: chance.integer({ min: 5, max: 500 }),
    };

    return isActive
      ? activeBetMock
      : {
          ...activeBetMock,
          result: chance.integer({ min: -500, max: 1000 }),
        };
  }

  static getMockMany(n: number): Bet[] {
    if (n <= 0) return [];

    return new Array(n).fill(1).map(d => Bet.getMockOne());
  }
}
