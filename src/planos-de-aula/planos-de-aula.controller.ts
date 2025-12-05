import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanosDeAulaService } from './planos-de-aula.service';
import { CreatePlanosDeAulaDto } from './dto/create-planos-de-aula.dto';
import { UpdatePlanosDeAulaDto } from './dto/update-planos-de-aula.dto';

@Controller('planos-de-aula')
export class PlanosDeAulaController {
  constructor(private readonly planosDeAulaService: PlanosDeAulaService) {}

  @Post()
  create(@Body() createPlanosDeAulaDto: CreatePlanosDeAulaDto) {
    return this.planosDeAulaService.create(createPlanosDeAulaDto);
  }

  @Get()
  findAll() {
    return this.planosDeAulaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planosDeAulaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanosDeAulaDto: UpdatePlanosDeAulaDto,
  ) {
    return this.planosDeAulaService.update(+id, updatePlanosDeAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planosDeAulaService.remove(+id);
  }
}
