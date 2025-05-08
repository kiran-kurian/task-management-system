# Task Manager

A full-stack task management application built with Next.js, NestJS, and PostgreSQL. The application features role-based access control, real-time notifications, and comprehensive task management capabilities.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, User)
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### Task Management
- Create, read, update, and delete tasks
- Task assignment and delegation
- Priority levels (Low, Medium, High)
- Status tracking (Todo, In Progress, Done)
- Due date management
- Overdue task highlighting

### Role-Based Features
- **Admin Dashboard**
  - Full system access
  - User management
  - View and manage all tasks
  - System-wide task monitoring

- **Manager Dashboard**
  - Create and assign tasks
  - Manage team tasks
  - View team performance
  - Task filtering and search

- **User Dashboard**
  - View assigned tasks
  - Update task status
  - Task filtering and search
  - Personal task management

### Search and Filter Functionality
- Text search in title and description
- Status filtering
- Priority filtering
- Due date filtering
- Real-time filtering updates
- Smart sorting with overdue tasks prioritization

### Notification System
- Real-time task notifications
- Assignment notifications
- Status update notifications
- Notification bell with unread count
- Mark notifications as read

### UI/UX Features
- Responsive design
- Modern gradient theme
- Interactive notifications
- Loading states
- Error handling
- Clean and intuitive interface

## Tech Stack

### Frontend
- Next.js 13+ (React)
- TypeScript
- Tailwind CSS
- Context API for state management

### Backend
- NestJS
- TypeScript
- PostgreSQL with Prisma ORM
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
task-manager/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js 13+ app directory
│   │   ├── components/    # Reusable components
│   │   ├── types/        # TypeScript type definitions
│   │   └── lib/          # Utility functions and hooks
│   └── package.json
│
└── backend/               # NestJS backend application
    ├── src/
    │   ├── auth/         # Authentication module
    │   ├── task/         # Task management module
    │   ├── user/         # User management module
    │   ├── notification/ # Notification module
    │   └── prisma/       # Database schema and migrations
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Backend Setup:
```bash
cd backend
npm install

# Create a .env file in the backend directory with:
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

npm run prisma:migrate  # Run database migrations
npm run start:dev      # Start backend server
```

3. Frontend Setup:
```bash
cd frontend
npm install

# Create a .env file in the frontend directory with:
NEXT_PUBLIC_API_URL="http://localhost:4000"

npm run dev           # Start frontend development server
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Environment Variables

### Backend (.env)
Required environment variables for the backend:
```
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
```
Make sure to:
- Replace user:password with your PostgreSQL credentials
- Use a strong, unique JWT_SECRET
- Adjust JWT_EXPIRES_IN as needed

### Frontend (.env)
Required environment variable for the frontend:
```
NEXT_PUBLIC_API_URL="http://localhost:4000"
```
Update this if your backend runs on a different port or host.

## API Documentation

The API includes the following main endpoints:

### Authentication
- POST /auth/register - Register new user
- POST /auth/login - User login
- GET /auth/role - Get user role

### Tasks
- GET /tasks - Get all tasks
- POST /tasks - Create new task
- PATCH /tasks/:id - Update task
- DELETE /tasks/:id - Delete task

### Users
- GET /users - Get all users (Admin/Manager only)
- GET /users/admin-only - Admin-only route

### Notifications
- GET /notifications - Get user notifications
- PATCH /notifications/:id/read - Mark notification as read