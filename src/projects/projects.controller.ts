import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Response } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const projects = await this.projectService.findAll();

      if (!projects || projects.length === 0) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).send({
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

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const newProject = await this.projectService.create(createProjectDto);

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: 'success create project',
        data: newProject,
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

  @Delete()
  async delete(
    @Body() deleteProjectDto: DeleteProjectDto,
    @Res() res: Response,
  ) {
    try {
      const deleteProject = await this.projectService.deleteById(
        deleteProjectDto.id,
      );
      return res.status(HttpStatus.OK).send({
        message: `Project with ID ${deleteProjectDto.id} successfully deleted`,
        statusCode: HttpStatus.OK,
        data: deleteProject,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Project with ID ${deleteProjectDto.id} not found`,
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message || 'Unknown error occurred',
      });
    }
  }

  @Put()
  async update(
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const { id, ...updateData } = updateProjectDto;

      const updatedProject = await this.projectService.update(id, updateData);

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: `Project with ID ${id} successfully updated`,
        data: updatedProject,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Project with ID ${updateProjectDto.id} not found`,
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message || 'Unknown error occurred',
      });
    }
  }
}
