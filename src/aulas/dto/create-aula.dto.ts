import { IsDateString, IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateAulaDto {
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  date: string;

  @IsInt()
  usuarioId: number;

  @IsOptional()
  @IsArray()
  alunosIds?: number[];
}
