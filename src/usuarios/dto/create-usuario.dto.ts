import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minLowercase: 1, minSymbols: 1 }, // configuração da senha forte (opcional)
    { message: 'Senha fraca' },
  )
  senha: string;

  @IsNotEmpty({ message: 'O campo de aluno ativo deve ser preenchido.' })
  @IsBoolean({ message: 'O campo aceita apenas "true" ou "false"' })
  isAtivo: boolean;
}
