import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }

    const role = dto.role === 'ADMIN' ? 'USER' : (dto.role || 'USER');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: role,
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.role) {
      throw new UnauthorizedException('User role not found');
    }

    return this.generateToken(user);
  }

  async getRoleByCredentials(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.role) {
      throw new UnauthorizedException('User role not found');
    }

    return user.role;
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
