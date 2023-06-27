import { Controller, Post, Body, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto)
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute() {
    // Esta ruta solo es accesible para usuarios autenticados con un token válido
    return 'Ruta protegida';
  }
}
