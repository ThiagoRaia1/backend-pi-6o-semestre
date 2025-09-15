import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) {}

  async validateUser(email: string, password: string) {
    // Buscamos o usuário pelo e-mail
    const user = await this.usuariosService.findOneByEmail(email);
    // Verificamos se o usuário existe e se a senha está correta
    if (user && bcrypt.compareSync(password, user.password)) {
      // Se o usuário existe e a senha está correta retornamos o usuário
      return user;
    }
    // Caso contrário retornamos null
    return null;
  }

  async login(user: { email: string; id: number }) {
    // Geramos o token JWT
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
