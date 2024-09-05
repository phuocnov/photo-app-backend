import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Workspace } from 'src/entities/workspace.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async getUsersWorkspaces(user: User) {
    return this.workspaceRepository.find({
      where: {
        id: user.id,
      },
    });
  }

  async findOne(id: number, user: User) {
    return this.workspaceRepository.findOne({
      where: {
        id,
        owner: user,
      },
    });
  }

  async createWorkspace(name: string, isPrivate: boolean, user: User) {
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

  async joinWorkspace(workspaceId: number, user: User) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });
    workspace.users.push(user);
    return this.workspaceRepository.save(workspace);
  }

  async leaveWorkspace(workspaceId: number, user: User) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });
    workspace.users = workspace.users.filter((v) => v.id !== user.id);
    return this.workspaceRepository.save(workspace);
  }

  async getSharedWorkspaces(user: User) {
    return this.workspaceRepository
      .createQueryBuilder('workspace')
      .innerJoin('workspace.users', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();
  }

  async getAvailableWorkspaces(user: User) {
    const myWorkspaces = await this.getUsersWorkspaces(user);
    const sharedWorkspaces = await this.getSharedWorkspaces(user);
    return [...myWorkspaces, ...sharedWorkspaces];
  }

  async findWorkspaceByName(name: string, user: User) {
    return this.workspaceRepository
      .createQueryBuilder('workspace')
      .where('workspace.name like :name', { name })
      .andWhere((queryBuilder) => {
        const subQuery = queryBuilder
          .subQuery()
          .select('user.id')
          .from('workspace.users', 'user')
          .where('user.id = :id', { id: user.id })
          .getQuery();
        return `workspace.ownerId = :id OR workspace.user IN ${subQuery}`;
      })
      .getMany();
  }
}
