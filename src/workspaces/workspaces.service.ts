import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/entities/workspace.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}
}
