import { IsArray, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as Chance from 'chance';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

const chance = new Chance();

export class User {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: chance.email(),
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: chance.string(),
    writeOnly: true,
  })
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty({
    example: chance.first(),
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: chance.last(),
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: chance.avatar({ protocol: 'http' }),
  })
  @IsString()
  pictureUrl: string;

  @ApiProperty({
    isArray: true,
    example: chance.n(chance.guid, chance.integer({ min: 0, max: 20 })),
  })
  @IsArray()
  @IsString({ each: true })
  bets: string[];

  @ApiProperty({
    isArray: true,
    example: chance.n(chance.guid, chance.integer({ min: 0, max: 10 })),
  })
  @IsArray()
  @IsString({ each: true })
  challanges: string[];

  constructor(user: Partial<User>) {
    Object.assign(this, _.pickBy(user, _.identity));
    if (!user.id) this.id = chance.guid();
    if (!user.bets) this.bets = [];
    if (!user.challanges) this.challanges = [];
  }

  static getMockOne(isNew?: boolean): User {
    return isNew
      ? {
        id: chance.guid(),
        email: chance.email(),
        password: chance.string(),
        firstName: chance.first(),
        lastName: chance.last(),
        pictureUrl: chance.avatar({ protocol: 'http' }),
        bets: [],
        challanges: [],
      }
      : {
        id: chance.guid(),
        email: chance.email(),
        password: chance.string(),
        firstName: chance.first(),
        lastName: chance.last(),
        pictureUrl: chance.avatar({ protocol: 'http' }),
        bets: chance.n(chance.guid, chance.integer({ min: 0, max: 50 })),
        challanges: chance.n(
          chance.guid,
          chance.integer({ min: 0, max: 30 }),
        ),
      };
  }

  static getMockMany(n: number): User[] {
    if (n <= 0) return [];

    return new Array(n)
      .fill(1)
      .map(u => User.getMockOne());
  }
}
