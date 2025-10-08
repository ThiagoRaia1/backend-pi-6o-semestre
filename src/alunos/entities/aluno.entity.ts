import { Aula } from 'src/aulas/entities/aula.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  dataNascimento: Date;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ type: 'boolean', default: true })
  isAtivo: boolean;

  // Relação N:N com aulas
  @ManyToMany(() => Aula, (aula) => aula.alunos)
  aulas: Aula[];
}
