import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

const chance = new Chance();

export class Challenge {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsBoolean()
  isDeleted = false;

  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  author: string;

  @ApiProperty({
    example: chance.sentence({
      punctuation: false,
      words: chance.integer({ min: 2, max: 7 }),
    }),
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: chance.paragraph(),
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: chance.date().toISOString(),
  })
  @IsString()
  endDate: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsBoolean()
  @IsOptional()
  outcome?: boolean;

  @ApiProperty({
    example: chance.url(),
  })
  @IsString()
  @IsOptional()
  proofUrl?: string;

  constructor(challenge: Partial<Challenge>) {
    Object.assign(this, _.pickBy(challenge, _.identity));
    if (!challenge.id) this.id = chance.guid();
  }

  static factory(data: Partial<Challenge>): Challenge {
    return new Challenge(data);
  }

  static getMockOne(
    isActive = chance.bool(),
    author: string = chance.guid(),
  ): Challenge {
    const activeChallangeMock = {
      id: chance.guid(),
      isDeleted: false,
      author,
      title: chance.sentence({
        punctuation: false,
        words: chance.integer({ min: 2, max: 7 }),
      }),
      description: chance.paragraph(),
      isActive: true,
      endDate: chance.date().toISOString(),
    };

    return isActive
      ? activeChallangeMock
      : {
          ...activeChallangeMock,
          isActive,
          outcome: chance.bool(),
          proofUrl: chance.url(),
        };
  }

  static getMockMany(n: number): Challenge[] {
    if (n <= 0) return [];

    return chance.n(Challenge.getMockOne, n);
  }
}
