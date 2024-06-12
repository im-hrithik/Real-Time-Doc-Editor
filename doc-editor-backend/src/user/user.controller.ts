import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userData: Prisma.UserCreateInput) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  async login(@Body() userData: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      userData.username,
      userData.password,
    );
    if (!user) {
      throw new HttpException('Invalid Credential', HttpStatus.NOT_FOUND);
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
