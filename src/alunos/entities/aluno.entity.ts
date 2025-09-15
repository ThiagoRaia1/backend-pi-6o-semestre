import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  email: string;

  @Column()
  cellphone: string;

  @Column()
  isActive: boolean;
}
