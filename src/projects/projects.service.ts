import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './interfaces/projects.interface';

@Injectable()
export class ProjectsService {
  // private readonly projects: Project[] = [];

  async findAll(): Promise<Project[]> {
    try {
      const res = await fetch('https://api.sandri.my.id/api/projects');
      if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

      const { data } = await res.json();
      if (!data) throw new Error('Data not found');

      const allProjects: Project[] = data.map((data: Project) => ({
        id: data.id,
        title: data.title,
        desc: data.desc,
        stack: data.stack,
        demo: data.demo,
        image: data.image,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }));

      return allProjects;
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
