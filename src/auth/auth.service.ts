import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) { }

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

  async login(user: { id: number, name: string }) {
    // Geramos o token JWT apenas com o ID do usuário para não mantermos nenhuma informação sensível no token
    // O ID é passado para que possamos buscar outros dados quando necessário mas sem os armazenar
    const payload = { sub: user.id };
    // Retornamos o token e o nome do usuário separadamente, pois apenas o token será salvo no AsyncStorage enquanto name permanecerá apenas no contexto da aplicação
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name
    };
  }
}
