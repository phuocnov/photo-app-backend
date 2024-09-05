import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/entities/workspace.entity';
import { WorkspacesController } from './workspaces.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  providers: [WorkspacesService],
  imports: [TypeOrmModule.forFeature([Workspace]), UsersModule],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
