import { IsString } from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as Chance from 'chance';

const chance = new Chance();

export class UpsertUserDto {

  @ApiModelPropertyOptional({
    example: chance.email(),
  })
  @IsString()
  email: string;

  @ApiModelProperty({
    example: chance.string(),
  })
  @IsString()
  password: string;

  @ApiModelProperty({
    example: chance.first(),
  })
  @IsString()
  firstName: string;

  @ApiModelProperty({
    example: chance.last(),
  })
  @IsString()
  lastName: string;

  @ApiModelProperty({
    example: chance.avatar({ protocol: 'http' }),
  })
  @IsString()
  pictureUrl: string;


}
