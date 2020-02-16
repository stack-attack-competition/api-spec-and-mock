import { IsOptional, IsString } from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as Chance from 'chance';
const chance = new Chance();

export class PatchUserDto {

  @ApiModelPropertyOptional({
    example: chance.email(),
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiModelProperty({
    example: chance.string(),
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiModelProperty({
    example: chance.first(),
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiModelProperty({
    example: chance.last(),
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiModelProperty({
    example: chance.avatar({protocol: 'http'}),
  })
  @IsString()
  @IsOptional()
  pictureUrl?: string;
}
