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

    // Converte a string para Date
    const data = new Date(dto.data);
    const hora = data.getHours();

    // Validação do horário permitido (entre 7h e 18h)
    if (hora < 7 || hora > 18) {
      throw new BadRequestException(
        'A aula só pode ser agendada entre 07:00 e 18:00.',
      );
    }

    // Verifica se já existe uma aula nesse mesmo dia e horário
    const aulaExistente = await this.aulaRepository.findOne({
      where: { data: data },
    });

    if (aulaExistente) {
      throw new BadRequestException(
        'Já existe uma aula agendada para este dia e horário.',
      );
    }

    // Verifica limite
    const totalAlunos = dto.alunosIds?.length || 0;
    if (totalAlunos > 5) {
      throw new BadRequestException(`Essa aula só pode ter até 5 alunos`);
    }

    const alunos =
      dto.alunosIds && dto.alunosIds.length > 0
        ? await this.alunoRepository.findBy({ id: In(dto.alunosIds) })
        : [];

    const aula = this.aulaRepository.create({
      data: new Date(dto.data),
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
    if (totalAlunos > 5) {
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
      .select(['aula.id', 'aula.data', 'usuario.nome', 'aluno.nome'])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} aula`;
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return `This action updates a #${id} aula`;
  }

  async remove(id: number) {
    const aula = await this.aulaRepository.findOneBy({ id });
    if (!aula) {
      throw new NotFoundException('Aula não encontrada');
    }
    return this.aulaRepository.remove(aula);
  }
}
