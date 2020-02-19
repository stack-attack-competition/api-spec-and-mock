import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';

const chance = new Chance();

export class CreateBetDto {
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
}
