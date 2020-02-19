import { IsString } from 'class-validator';
import * as Chance from 'chance';
import { ApiProperty } from '@nestjs/swagger';

const chance = new Chance();

export class CreateUserDto {

  @ApiProperty({
    example: chance.email(),
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: chance.string(),
  })
  @IsString()
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
}
