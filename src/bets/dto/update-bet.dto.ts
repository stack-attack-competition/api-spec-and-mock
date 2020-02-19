import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import * as Chance from 'chance';

const chance = new Chance();

export class UpdateBetDto {
  @ApiProperty({
    example: chance.bool(),
  })
  @IsBoolean()
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
