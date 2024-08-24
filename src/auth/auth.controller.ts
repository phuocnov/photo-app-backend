import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './authDto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    console.log({ username, password });

    return await this.authService.signIn(username, password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user-profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
