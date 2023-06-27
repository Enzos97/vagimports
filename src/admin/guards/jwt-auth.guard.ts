import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AdminService } from '../admin.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    return this.adminService.validateToken(token);
  }

  private extractTokenFromRequest(request: Request): string {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Eliminar "Bearer " del encabezado de autenticación
    }
    throw new UnauthorizedException('Invalid token');
  }
}