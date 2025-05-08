import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string; role?: Role }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: [Role.USER, Role.MANAGER]
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
