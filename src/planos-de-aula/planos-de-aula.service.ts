import { Injectable } from '@nestjs/common';
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

  update(id: number, updatePlanosDeAulaDto: UpdatePlanosDeAulaDto) {
    return `This action updates a #${id} planosDeAula`;
  }

  remove(id: number) {
    return `This action removes a #${id} planosDeAula`;
  }
}
