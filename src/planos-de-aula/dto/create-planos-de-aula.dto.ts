import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Aula } from 'src/aulas/entities/aula.entity';

export class CreatePlanosDeAulaDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @IsOptional()
  plano?: string;

  @IsBoolean()
  salvo: boolean;

  @IsOptional()
  aulas?: Aula[];
}
