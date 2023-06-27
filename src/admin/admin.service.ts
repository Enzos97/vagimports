import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt,{ compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  private readonly admin = {
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10), // Contraseña: admin123
  };

  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto)
    const isAdmin = this.validateAdmin(loginDto.username, loginDto.password);
    if (!isAdmin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken();
    return {
      token,
      isValid:true
    };
  }

  validateAdmin(username: string, password: string): boolean {
    return username === this.admin.username && compareSync(password, this.admin.password);
  }

  generateToken(): string {
    const payload = { username: this.admin.username };
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}