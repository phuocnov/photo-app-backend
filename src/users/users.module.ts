import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
