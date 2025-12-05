import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanosDeAulaDto } from './dto/create-planos-de-aula.dto';
import { UpdatePlanosDeAulaDto } from './dto/update-planos-de-aula.dto';
import { PlanosDeAula } from './entities/planos-de-aula.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanosDeAulaService {
  constructor(
    @InjectRepository(PlanosDeAula)
    private planosDeAulaRepository: Repository<PlanosDeAula>,
  ) {}

  async create(createPlanosDeAulaDto: CreatePlanosDeAulaDto) {
    return this.planosDeAulaRepository.save(createPlanosDeAulaDto);
  }

  findAll() {
    return this.planosDeAulaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} planosDeAula`;
  }

  async update(id: number, updatePlanosDeAulaDto: UpdatePlanosDeAulaDto) {
    // 1. Busca o plano pelo ID
    const plano = await this.planosDeAulaRepository.findOne({ where: { id } });

    if (!plano) {
      throw new NotFoundException(`Plano de aula com ID ${id} não encontrado.`);
    }

    // 2. Atualiza somente os campos enviados pelo DTO
    Object.assign(plano, updatePlanosDeAulaDto);

    // 3. Salva no banco
    await this.planosDeAulaRepository.save(plano);

    // 4. Retorna o plano atualizado
    return plano;
  }

  async remove(id: number) {
    // 1. Buscar o plano pelo ID
    const plano = await this.planosDeAulaRepository.findOne({ where: { id } });

    if (!plano) {
      throw new NotFoundException(`Plano de aula com ID ${id} não encontrado.`);
    }

    // 2. Alterar o campo salvo para false
    plano.salvo = false;

    // 3. Salvar alteração no banco
    await this.planosDeAulaRepository.save(plano);

    // 4. Retornar o plano atualizado
    return plano;
  }
}
