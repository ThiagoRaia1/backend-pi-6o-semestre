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
  name: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser um texto válido' })
  cpf: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Deve ser uma data válida' }) // depois os validators
  @Type(() => Date) // Verifica os transformers primeiro
  birthDate: Date;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Celular é obrigatório' })
  @IsString({ message: 'Celular deve ser um texto válido' })
  cellphone: string;

  @IsNotEmpty({ message: 'O campo de aluno ativo deve ser preenchido.' })
  @IsBoolean({ message: 'O campo aceita apenas "true" ou "false"' })
  isActive: boolean = true;

  @IsOptional()
  @IsArray()
  aulas?: number[]; // ids das aulas (opcional)
}
