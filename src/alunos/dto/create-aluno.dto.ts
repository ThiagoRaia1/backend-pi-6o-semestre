import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser um texto válido' })
  nome: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser um texto válido' })
  cpf: string;

  @IsDateString({}, { message: 'Deve ser uma data válida' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  dataNascimento: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Celular é obrigatório' })
  @IsString({ message: 'Celular deve ser um texto válido' })
  telefone: string;

  @IsOptional()
  descricao?: string;

  @IsNotEmpty({ message: 'O campo de aluno ativo deve ser preenchido.' })
  @IsBoolean({ message: 'O campo aceita apenas "true" ou "false"' })
  isAtivo: boolean = true;

  @IsOptional()
  @IsArray()
  aulas?: number[]; // ids das aulas (opcional)
}
