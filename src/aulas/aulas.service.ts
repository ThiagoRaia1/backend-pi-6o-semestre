import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAulaDto } from './dto/create-aula.dto';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Aula } from './entities/aula.entity';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { AddAlunosAulaDto } from './dto/add-alunos-aula.dto';

@Injectable()
export class AulasService {
  constructor(
    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async create(dto: CreateAulaDto): Promise<Aula> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: dto.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const alunos = await this.alunoRepository.findByIds(dto.alunosIds || []);

    const aula = this.aulaRepository.create({
      date: new Date(dto.date),
      usuario,
      alunos,
    });

    return this.aulaRepository.save(aula);
  }

  async addAlunos(aulaId: number, dto: AddAlunosAulaDto) {
    const aula = await this.aulaRepository.findOne({
      where: { id: aulaId },
      relations: ['alunos'],
    });

    if (!aula) {
      throw new NotFoundException('Aula não encontrada');
    }

    // Verifica limite
    const totalAlunos = aula.alunos.length + dto.alunosIds.length;
    if (totalAlunos >= 5) {
      throw new BadRequestException(`Essa aula só pode ter até 5 alunos`);
    }

    // Busca os alunos
    const alunos = await this.alunoRepository.find({
      where: { id: In(dto.alunosIds) },
    });

    if (alunos.length !== dto.alunosIds.length) {
      throw new NotFoundException('Alguns alunos não foram encontrados');
    }

    // Adiciona os novos alunos
    aula.alunos.push(...alunos);

    return this.aulaRepository.save(aula);
  }

  async findAll(): Promise<any[]> {
    return this.aulaRepository
      .createQueryBuilder('aula')
      .leftJoin('aula.usuario', 'usuario')
      .leftJoin('aula.alunos', 'aluno')
      .select(['aula.id', 'aula.date', 'usuario.name', 'aluno.name'])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} aula`;
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return `This action updates a #${id} aula`;
  }

  remove(id: number) {
    return `This action removes a #${id} aula`;
  }
}
