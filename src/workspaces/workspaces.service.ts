import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Workspace } from 'src/entities/workspace.entity';
import { UsersService } from 'src/users/users.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async findAll(user: User) {
    return this.workspaceRepository.find({
      where: {
        id: user.id,
      },
    });
  }

  async findByName(user: User, name: string) {
    return this.workspaceRepository.find({
      where: {
        id: user.id,
        name: Like(`%${name}%`),
      },
    });
  }

  async createWorkspace(name: string, user: User) {
    const workspace = this.workspaceRepository.create({
      owner: user,
      name: name,
    });
    return this.workspaceRepository.save(workspace);
  }

  async renameWorkspace(name: string, workspaceId: number) {
    return this.workspaceRepository.update({ id: workspaceId }, { name });
  }

  async deleteWorkspace(workspaceId: number) {
    return this.workspaceRepository.delete({ id: workspaceId });
  }
}
