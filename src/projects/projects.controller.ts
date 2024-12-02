import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const projects = await this.projectService.findAll();
      res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: 'success get all projects',
        data: projects,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).send(error.getResponse());
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message || 'Unknown error occurred',
      });
    }
  }
}
