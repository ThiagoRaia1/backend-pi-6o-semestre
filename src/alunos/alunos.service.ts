import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const { aulas, dataNascimento, ...rest } = createAlunoDto;

    const aluno = this.alunosRepository.create({
      ...rest,
      dataNascimento: new Date(dataNascimento), // aqui converte corretamente
      aulas: aulas?.map((id) => ({ id }) as Aula),
    });

    const resultado = await this.alunosRepository.save(aluno);
    // console.log(resultado);
    return resultado;
  }

  async createData(createAlunoDto: CreateAlunoDto[]) {
    // Transforma os DTOs em algo compatível com a entidade
    const alunos = createAlunoDto.map((dto) => {
      const { aulas, ...rest } = dto;

      return this.alunosRepository.create({
        ...rest,
        aulas: aulas?.map((id) => ({ id }) as Aula), // transforma [1,2] em [{id:1},{id:2}]
      });
    });

    // Salva todos de uma vez
    return this.alunosRepository.save(alunos);
  }

  findAll() {
    return this.alunosRepository.find();
  }

  findOneById(id: number) {
    return this.alunosRepository.findOneBy({ id });
  }

  findOneByNome(nome: string) {
    return this.alunosRepository.findOneBy({ nome });
  }

  findOneByEmail(email: string) {
    return this.alunosRepository.findOneBy({ email });
  }

  findOneByCpf(cpf: string) {
    return this.alunosRepository.findOneBy({ cpf });
  }

  async updateById(id: number, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.alunosRepository.findOne({
      where: { id },
      relations: ['aulas'], // importante se quiser atualizar a relação
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const { aulas, ...rest } = updateAlunoDto;

    // Faz o merge apenas com os campos normais
    this.alunosRepository.merge(aluno, rest);

    // Se veio aulas no DTO, transforma os ids em objetos { id }
    if (aulas) {
      aluno.aulas = aulas.map((id) => ({ id }) as Aula);
    }

    return this.alunosRepository.save(aluno);
  }

  async ativar(id: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    aluno.isAtivo = true;
    return this.alunosRepository.save(aluno);
  }

  async desativar(id: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    aluno.isAtivo = false;
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
