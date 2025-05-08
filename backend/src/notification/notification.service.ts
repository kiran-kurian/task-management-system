import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        taskId: dto.taskId,
        message: dto.message,
        read: false,
      },
    });
  }

  async findAllForUser(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      include: {
        task: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: number, userId: number) {
    return this.prisma.notification.update({
      where: { id, userId },
      data: { read: true },
    });
  }

  async deleteForUser(id: number, userId: number) {
    return this.prisma.notification.delete({
      where: { id, userId },
    });
  }
} 