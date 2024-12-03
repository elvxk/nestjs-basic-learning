import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './interfaces/projects.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    try {
      const data = await this.prisma.projects.findMany();
      if (!data) throw new Error('Data not found');
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message || 'Unknown error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
