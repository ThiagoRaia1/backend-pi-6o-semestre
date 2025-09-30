import { Aula } from 'src/aulas/entities/aula.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Um instrutor pode ter várias aulas
  @OneToMany(() => Aula, (aula) => aula.usuario)
  aulas: Aula[];
}
