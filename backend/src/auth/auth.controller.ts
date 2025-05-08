import { Body, Controller, Get, Post, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('get-role')
  async getRoleByCredentials(@Body() body: { email: string; password: string }) {
    const role = await this.authService.getRoleByCredentials(body.email, body.password);
    return { role };
  }

  @UseGuards(JwtAuthGuard)
  @Get('role')
  getRole(@Request() req) {
    if (!req.user.role) {
      throw new UnauthorizedException('Role not found for the user');
    }
    return { role: req.user.role };
  }
}
