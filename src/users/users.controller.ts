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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import * as Chance from 'chance';

const chance = new Chance();

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersSvc: UsersService) {
  }

  @Get('')
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  getUsers() {
    console.log(this.usersSvc.findAllUsers());
    return this.usersSvc.findAllUsers();
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
  getUserByUuid(@Param('uuid', new ParseUUIDPipe()) userId: string) {
    const user = this.usersSvc.findUserById(userId);
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
  createUser(@Body() user: UpsertUserDto) {
    return this.usersSvc.upsertUser(user);
  }

  @Put(':uuid')
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
  updateUser(
    @Param('uuid', new ParseUUIDPipe()) userId: string,
    @Body() user: UpsertUserDto,
  ) {
    return this.usersSvc.upsertUser(user, userId);
  }

  @Patch(':uuid')
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
  partialUpdateUser(
    @Param('uuid', new ParseUUIDPipe()) userId: string,
    @Body() user: PatchUserDto,
  ) {
    return this.usersSvc.upsertUser(user, userId);
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
  deleteUser(@Param('uuid', new ParseUUIDPipe()) userId: string) {
    return this.usersSvc.removeUser(userId);
  }
}
