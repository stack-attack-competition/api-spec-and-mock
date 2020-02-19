import { IsArray, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as Chance from 'chance';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';

const chance = new Chance();

@ObjectType()
export class User {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  @Field()
  id: string;

  @ApiProperty({
    example: chance.email(),
  })
  @IsString()
  @Field()
  email: string;

  @ApiProperty({
    example: chance.string(),
    writeOnly: true,
  })
  @IsString()
  @Exclude()
  @Field()
  password: string;

  @ApiProperty({
    example: chance.first(),
  })
  @IsString()
  @Field()
  firstName: string;

  @ApiProperty({
    example: chance.last(),
  })
  @IsString()
  @Field()
  lastName: string;

  @ApiProperty({
    example: chance.avatar({ protocol: 'http' }),
  })
  @IsString()
  @Field()
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
  challenges: string[];

  constructor(user: Partial<User>) {
    Object.assign(this, _.pickBy(user, _.identity));
    if (!user.id) this.id = chance.guid();
    if (!user.bets) this.bets = [];
    if (!user.challenges) this.challenges = [];
  }

  static factory(data: Partial<User>): User {
    return new User(data);
  }

  static getMockOne(isNew?: boolean): User {
    return {
      id: chance.guid(),
      email: chance.email(),
      password: chance.string(),
      firstName: chance.first(),
      lastName: chance.last(),
      pictureUrl: chance.avatar({ protocol: 'http' }),
      bets: isNew
        ? []
        : chance.n(chance.guid, chance.integer({ min: 0, max: 50 })),
      challenges: isNew
        ? []
        : chance.n(chance.guid, chance.integer({ min: 0, max: 30 })),
    };
  }

  static getMockMany(n: number): User[] {
    if (n <= 0) return [];

    return new Array(n).fill(1).map(d => User.getMockOne());
  }
}
