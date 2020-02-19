import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private usersSvc: UsersService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const user = this.usersSvc.findBy('email', loginDto.email);

    if (!user || user.password !== loginDto.password)
      throw new UnauthorizedException();

    return user;
  }

  @Post('register')
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
  register(@Body() user: CreateUserDto) {
    return this.usersSvc.update(user);
  }
}
