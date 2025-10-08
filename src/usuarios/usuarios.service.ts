import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const senha = await bcrypt.hash(createUsuarioDto.senha, 10); // Usamos o bcrypt para a hash da senha
    const user = this.usuariosRepository.create({
      ...createUsuarioDto,
      senha,
    }); // Passamos a senha criptografada e o restante dos dados
    return this.usuariosRepository.save(user);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }
  
  findOneByEmail(email: string) {
    return this.usuariosRepository.findOneBy({ email });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usuariosRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    this.usuariosRepository.merge(user, updateUsuarioDto);
    return this.usuariosRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usuariosRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.usuariosRepository.remove(user);
  }
}
