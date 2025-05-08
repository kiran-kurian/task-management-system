export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdById: number;
  assignedToId: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: number;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  assignedToId: number;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {} 