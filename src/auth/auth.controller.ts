import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './authDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    console.log({ username, password });

    return await this.authService.signIn(username, password);
  }

  @Public()
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    return await this.authService.signUp(username, password);
  }

  @Public()
  @ApiBearerAuth()
  @Get('user-profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
