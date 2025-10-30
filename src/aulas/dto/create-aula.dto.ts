import {
  IsDateString,
  IsInt,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAulaDto {
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  data: string;

  @IsString()
  @IsOptional()
  planoDeAula?: string;

  @IsInt()
  usuarioId: number;

  @IsOptional()
  @IsArray()
  alunosIds?: number[];
}
