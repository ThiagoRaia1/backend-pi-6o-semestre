import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class AddAlunosAulaDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  alunosIds: number[];
}
