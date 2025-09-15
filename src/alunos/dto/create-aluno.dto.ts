import {
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser um texto válido' })
  name: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser um texto válido' })
  cpf: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @IsDate({ message: 'Deve ser uma data válida' })
  birthDate: Date;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsString({ message: 'Email deve ser um texto válido' })
  email: string;

  @IsNotEmpty({ message: 'Celular é obrigatório' })
  @IsString({ message: 'Celular deve ser um texto válido' })
  cellphone: string;

  @IsNotEmpty({ message: 'O campo de aluno ativo deve ser preenchido.' })
  @IsBoolean({ message: 'O campo aceita apenas "true" ou "false"' })
  isActive: boolean;
}
