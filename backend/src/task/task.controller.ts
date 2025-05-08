import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Roles } from '../auth/roles.decorator';
  import { RolesGuard } from '../auth/roles.guard';
  import { Role } from '@prisma/client';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    @Roles(Role.MANAGER, Role.ADMIN)
    create(@Request() req, @Body() dto: CreateTaskDto) {
      return this.taskService.create(req.user.userId, dto);
    }
  
    @Get()
    findAll(@Request() req) {
      console.log("Logged-in user ID:", req.user.userId);
      return this.taskService.findAll(req.user.userId, req.user.role);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.taskService.findOne(id);
    }
  
    @Patch(':id')
    update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
      return this.taskService.update(id, req.user.userId, req.user.role, dto);
    }
  
    @Delete(':id')
    remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
      return this.taskService.remove(id, req.user.userId, req.user.role);
    }
  }
