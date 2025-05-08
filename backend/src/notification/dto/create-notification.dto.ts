import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  taskId: number;

  @IsString()
  message: string;
} 