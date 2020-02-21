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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersSvc: UsersService) {}

  @Get('')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  getAll(@Query('showDeleted') showDeleted: boolean = false) {
    return this.usersSvc.findAll(showDeleted);
  }

  @Get(':uuid')
  @ApiQuery({ name: 'showDeleted', required: false })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User does not exist!',
  })
  getById(
    @Param('uuid', new ParseUUIDPipe()) userId: string,
    @Query('showDeleted') showDeleted: boolean = false,
  ) {
    const user = this.usersSvc.findById(userId, showDeleted);
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
  create(@Body() user: CreateUserDto) {
    return this.usersSvc.create(user);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary:
      'Partial update, only the sent keys that exist on the model will be used',
  })
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
    @Body() user: UpdateUserDto,
  ) {
    return this.usersSvc.update(user, userId);
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
