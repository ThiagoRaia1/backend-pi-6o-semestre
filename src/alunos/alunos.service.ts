import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const aluno = this.alunosRepository.create(createAlunoDto); // Passamos a senha criptografada e o restante dos dados
    return this.alunosRepository.save(aluno);
  }

  findAll() {
    return this.alunosRepository.find();
  }

  findOneById(id: number) {
    return this.alunosRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.alunosRepository.findOneBy({ name });
  }

  findOneByEmail(email: string) {
    return this.alunosRepository.findOneBy({ email });
  }

  findOneByCpf(cpf: string) {
    return this.alunosRepository.findOneBy({ cpf });
  }

  async updateById(id: number, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    this.alunosRepository.merge(aluno, updateAlunoDto);
    return this.alunosRepository.save(aluno);
  }

  async removeById(id: number) {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return this.alunosRepository.remove(aluno);
  }
}
