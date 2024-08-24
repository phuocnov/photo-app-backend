import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './authDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    console.log({ username, password });

    return await this.authService.signIn(username, password);
  }

  @ApiBearerAuth()
  @Get('user-profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
