import { Aluno } from 'src/alunos/entities/aluno.entity';
import { PlanosDeAula } from 'src/planos-de-aula/entities/planos-de-aula.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Aula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  // Relação N:N com alunos
  @ManyToMany(() => Aluno, (aluno) => aluno.aulas)
  @JoinTable() // cria a tabela de junção aula_alunos
  alunos: Aluno[];

  // Relação N:1 com usuário (instrutor)
  @ManyToOne(() => Usuario, (usuario) => usuario.aulas)
  usuario: Usuario;

  // Relação N:1 com planos de aula
  @ManyToOne(() => PlanosDeAula, (plano) => plano.aulas)
  planoDeAula: PlanosDeAula;
}
