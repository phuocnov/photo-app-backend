import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './authDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { ValidationPipe } from './validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    const { username, password } = signInDto;
    return await this.authService.signIn(username, password);
  }

  @Public()
  @Post('register')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    return await this.authService.signUp(username, password);
  }

  @ApiBearerAuth('access-token')
  @Get('user-profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
