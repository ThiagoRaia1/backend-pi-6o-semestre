import { IsDateString, IsInt, IsArray, IsOptional } from 'class-validator';
import { PlanosDeAula } from 'src/planos-de-aula/entities/planos-de-aula.entity';

export class CreateAulaDto {
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  data: string;

  @IsInt()
  usuarioId: number;

  @IsOptional()
  @IsArray()
  alunosIds?: number[];

  @IsOptional()
  planoDeAula?: PlanosDeAula;
}
