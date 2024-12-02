import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('projects')
export class ProjectsController {
  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      success: true,
      data: {
        name: 'NestJS',
        date: new Date().toLocaleString(),
      },
    });
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    try {
      const data = req.body;
      if (!data) {
        res.status(HttpStatus.BAD_REQUEST).send({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: 'Bad request',
        });
      }
      res.status(HttpStatus.CREATED).send(data);
    } catch (error) {
      res.send(error.message);
    }
  }
}
