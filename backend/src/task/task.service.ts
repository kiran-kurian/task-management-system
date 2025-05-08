import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  async create(userId: number, dto: CreateTaskDto) {
    console.log('Creating task with userId:', userId);
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
        priority: dto.priority,
        status: dto.status,
        assignedToId: dto.assignedToId,
        createdById: userId,
      },
    });

    await this.notificationService.create({
      userId: dto.assignedToId,
      taskId: task.id,
      message: `You have been assigned a new task: ${task.title}`,
    });

    return task;
  }

  async findAll(userId: number, userRole: Role) {
    console.log("Fetching tasks for userId:", userId, "with role:", userRole);
    
    const tasks = await this.prisma.task.findMany({
      where: userRole === Role.ADMIN 
        ? {}
        : userRole === Role.USER 
          ? { assignedToId: userId }
          : { createdById: userId },
      include: {
        createdBy: true,
        assignedTo: true,
      },
    });
    console.log("Tasks fetched:", tasks);
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, userId: number, userRole: Role, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ 
      where: { id },
      include: { assignedTo: true }
    });
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (userRole === Role.ADMIN) {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: { ...dto },
      });

      if (dto.assignedToId && dto.assignedToId !== task.assignedToId) {
        await this.notificationService.create({
          userId: dto.assignedToId,
          taskId: task.id,
          message: `You have been assigned to task: ${task.title}`,
        });
      }

      return updatedTask;
    }

    if (Object.keys(dto).length === 1 && 'status' in dto) {
      if (task.createdById !== userId && task.assignedToId !== userId) {
        throw new ForbiddenException('You cannot update this task');
      }
    } else {
      if (task.createdById !== userId) {
        throw new ForbiddenException('You cannot edit this task');
      }

      if (dto.assignedToId && dto.assignedToId !== task.assignedToId) {
        await this.notificationService.create({
          userId: dto.assignedToId,
          taskId: task.id,
          message: `You have been assigned to task: ${task.title}`,
        });
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: number, userId: number, userRole: Role) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (userRole === Role.ADMIN) {
      return this.prisma.task.delete({ where: { id } });
    }

    if (task.createdById !== userId) {
      throw new ForbiddenException('You cannot delete this task');
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
