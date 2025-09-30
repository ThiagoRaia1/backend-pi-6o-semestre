import { Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aula, Usuario, Aluno]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AulasController],
  providers: [AulasService],
})
export class AulasModule {}
