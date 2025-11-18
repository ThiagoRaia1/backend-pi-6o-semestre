import { Aula } from 'src/aulas/entities/aula.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlanosDeAula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  titulo: string;

  @Column()
  plano: string;

  @Column()
  salvo: boolean;

  // Relação 1:N com aulas
  @OneToMany(() => Aula, (aula) => aula.planoDeAula, {
    nullable: true,
  })
  aulas?: Aula[];
}
