import { Controller, Get, Patch, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(@Request() req) {
    return this.notificationService.findAllForUser(req.user.userId);
  }

  @Patch(':id/read')
  markAsRead(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.notificationService.markAsRead(id, req.user.userId);
  }
} 