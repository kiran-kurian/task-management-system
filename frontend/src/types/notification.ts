export interface Notification {
  id: number;
  userId: number;
  taskId: number;
  message: string;
  read: boolean;
  createdAt: string;
  task?: {
    title: string;
  };
}

export interface CreateNotificationDto {
  userId: number;
  taskId: number;
  message: string;
} 