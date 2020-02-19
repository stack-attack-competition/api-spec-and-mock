import { IsBoolean, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';
import { ApiProperty } from '@nestjs/swagger';

const chance = new Chance();

export class CreateChallengeDto {
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
}
