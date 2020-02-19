import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersSvc: UsersService) {}

  @Get('')
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  getAll() {
    return this.usersSvc.findAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User does not exist!',
  })
  getById(@Param('uuid', new ParseUUIDPipe()) userId: string) {
    const user = this.usersSvc.findById(userId);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem',
  })
  @ApiResponse({
    status: 409,
    description: 'Email address is taken!',
  })
  create(@Body() user: UpsertUserDto) {
    return this.usersSvc.upsert(user);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Whole object replace'})
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  @ApiResponse({
    status: 404,
    description: 'The user can not be found!',
  })
  @ApiResponse({
    status: 409,
    description: 'Email address is taken!',
  })
  update(
    @Param('uuid', new ParseUUIDPipe()) userId: string,
    @Body() user: UpsertUserDto,
  ) {
    return this.usersSvc.upsert(user, userId);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Partial update, only the sent keys that exist on the model will be used'})
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, payload problem!',
  })
  @ApiResponse({
    status: 404,
    description: 'The user can not be found!',
  })
  @ApiResponse({
    status: 409,
    description: 'Email address is taken!',
  })
  partialUpdate(
    @Param('uuid', new ParseUUIDPipe()) userId: string,
    @Body() user: PatchUserDto,
  ) {
    return this.usersSvc.upsert(user, userId);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'The user can not be found!',
  })
  remove(@Param('uuid', new ParseUUIDPipe()) userId: string) {
    return this.usersSvc.remove(userId);
  }
}
