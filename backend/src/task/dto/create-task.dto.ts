import { IsString, IsNotEmpty, IsEnum, IsDateString, IsInt } from 'class-validator';
import { Priority, Status } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  assignedToId: number;
}
