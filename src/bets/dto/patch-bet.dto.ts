import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';

const chance = new Chance();

export class PatchBetDto {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  @IsOptional()
  challenge?: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsString()
  @IsOptional()
  inFavor?: boolean;

  @ApiProperty({
    example: chance.integer({ min: 5, max: 500 }),
  })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    example: chance.integer({ min: 5, max: 500 }),
  })
  @IsNumber()
  @IsOptional()
  result?: number;
}
