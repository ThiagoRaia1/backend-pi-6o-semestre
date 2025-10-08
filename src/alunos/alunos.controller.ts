import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  @Post('data')
  createData(@Body() createAlunoDto: CreateAlunoDto[]) {
    return this.alunosService.createData(createAlunoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.alunosService.findAll();
  }

  @Get('id/:id')
  @UseGuards(AuthGuard)
  findOneById(@Param('id') id: string) {
    return this.alunosService.findOneById(+id);
  }

  @Get('nome/:nome')
  @UseGuards(AuthGuard)
  findOneByNome(@Param('nome') nome: string) {
    return this.alunosService.findOneByNome(nome);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard)
  findOneByEmail(@Param('email') email: string) {
    return this.alunosService.findOneByEmail(email);
  }

  @Get('cpf/:cpf')
  @UseGuards(AuthGuard)
  findOneByCpf(@Param('cpf') cpf: string) {
    return this.alunosService.findOneByCpf(cpf);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateById(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunosService.updateById(+id, updateAlunoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  removeById(@Param('id') id: string) {
    return this.alunosService.removeById(+id);
  }
}
