import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/projects.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit: number) {
    return this.prisma.projects.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: limit as number,
    });
  }

  async create(data: Prisma.ProjectsCreateInput): Promise<Project> {
    return this.prisma.projects.create({ data });
  }

  async deleteById(id: string) {
    return this.prisma.projects.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.ProjectsUpdateInput) {
    return this.prisma.projects.update({
      where: {
        id,
      },
      data,
    });
  }
}
