import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { AddAlunosAulaDto } from './dto/add-alunos-aula.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @Post(':id/alunos')
  @UseGuards(AuthGuard)
  addAlunosToAula(
    @Param('id', ParseIntPipe) aulaId: number,
    @Body() dto: AddAlunosAulaDto,
  ) {
    return this.aulasService.addAlunos(aulaId, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.aulasService.findAll();
  }

  @Get('cheias/:data')
  @UseGuards(AuthGuard)
  async getHorariosCheios(@Param('data') data: string) {
    return this.aulasService.findHorariosCheiosPorDia(data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(+id, updateAulaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.aulasService.remove(+id);
  }
}
