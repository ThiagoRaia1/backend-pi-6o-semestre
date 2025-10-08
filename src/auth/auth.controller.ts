import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    if (!body.email || !body.senha) {
      throw new BadRequestException('Informe e-mail e senha'); // 400
    }
    const user = await this.authService.validateUser(body.email, body.senha);
    if (user) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException('Usuário ou senha inválidos'); // 401
  }
}
