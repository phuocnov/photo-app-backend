import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class SignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
