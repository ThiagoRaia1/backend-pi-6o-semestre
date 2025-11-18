import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanosDeAulaDto } from './create-planos-de-aula.dto';

export class UpdatePlanosDeAulaDto extends PartialType(CreatePlanosDeAulaDto) {}
