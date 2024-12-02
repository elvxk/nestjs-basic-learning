import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/projects.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.projects.findMany();
  }

  async create(data: Prisma.ProjectsCreateInput): Promise<Project> {
    return this.prisma.projects.create({ data });
  }
}
