import { Aula } from 'src/aulas/entities/aula.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relação N:N com aulas
  @ManyToMany(() => Aula, (aula) => aula.alunos)
  aulas: Aula[];
}
