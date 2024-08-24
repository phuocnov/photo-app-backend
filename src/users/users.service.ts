/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: '123123123',
    },
    {
      userId: 1,
      username: 'maria',
      password: '123123123',
    },
  ];
  
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user=> user.username === username);
  };
}
