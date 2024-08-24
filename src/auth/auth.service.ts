import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne(username);
    console.log('SERVICE::found user', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user && user.password !== password) {
      throw new UnauthorizedException();
    }
    // TODO: Implement JWT token generation

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
