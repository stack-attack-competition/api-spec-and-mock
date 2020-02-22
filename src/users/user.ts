import { IsBoolean, IsString } from 'class-validator';
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
    example: chance.bool(),
    type: 'boolean'
  })
  @IsBoolean()
  isDeleted = false;

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

  constructor(user: Partial<User>) {
    Object.assign(this, _.pickBy(user, _.identity));
    if (!user.id) this.id = chance.guid();
  }

  static factory(data: Partial<User>): User {
    return new User(data);
  }

  static getMockOne(): User {
    return {
      id: chance.guid(),
      isDeleted: false,
      email: chance.email(),
      password: chance.string(),
      firstName: chance.first(),
      lastName: chance.last(),
      pictureUrl: chance.avatar({ protocol: 'http' }),
    };
  }

  static getMockMany(n: number): User[] {
    if (n <= 0) return [];

    return chance.n(User.getMockOne, n);
  }
}
