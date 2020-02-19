import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDbDto {
  @ApiProperty({ default: 3 })
  @IsString()
  userCount: string;

  @ApiProperty({ default: 1 })
  @IsString()
  challengeCount: string;

  @ApiProperty({ default: 1 })
  @IsString()
  betCount: string;
}
