import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WorkspaceDto } from './workspaces.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  @ApiBearerAuth('access-token')
  async allWorkspaces(@Request() req) {
    const user = req.user;
    return this.workspacesService.getAvailableWorkspaces(user);
  }

  @Get(':name')
  @ApiBearerAuth('access-token')
  async findWorkspace(@Request() req) {
    const user = req.user;
    const name = req.params.name;
    return this.workspacesService.findWorkspaceByName(name, user);
  }

  @Post()
  @ApiBearerAuth('access-token')
  async createWorkspace(
    @Request() req,
    @Body(new ValidationPipe()) body: WorkspaceDto,
  ) {
    const { name, isPrivate } = body;
    const user = req.user;
    return this.workspacesService.createWorkspace(name, isPrivate, user);
  }

  @Put()
  @ApiBearerAuth('access-token')
  async renameWorkspace(
    @Request() req,
    @Body(new ValidationPipe()) body: WorkspaceDto,
  ) {
    const user = req.user;
    const { name, isPrivate } = body;
    return this.workspacesService.createWorkspace(name, isPrivate, user);
  }
}
