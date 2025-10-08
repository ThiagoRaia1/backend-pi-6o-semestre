import { Aula } from 'src/aulas/entities/aula.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'boolean', default: true })
  isAtivo: boolean;

  // Um instrutor pode ter várias aulas
  @OneToMany(() => Aula, (aula) => aula.usuario)
  aulas: Aula[];
}
