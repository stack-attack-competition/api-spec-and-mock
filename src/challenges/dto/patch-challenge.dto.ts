import { IsBoolean, IsOptional, IsString } from 'class-validator';
import * as Chance from 'chance';
import { ApiProperty } from '@nestjs/swagger';

const chance = new Chance();

export class PatchChallengeDto {
  @ApiProperty({
    example: chance.guid(),
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    example: chance.sentence({
      punctuation: false,
      words: chance.integer({ min: 2, max: 7 }),
    }),
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: chance.paragraph(),
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: chance.bool(),
  })
  @IsString()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: chance.date().toISOString(),
  })
  @IsString()
  @IsOptional()
  endDate?: string;

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
