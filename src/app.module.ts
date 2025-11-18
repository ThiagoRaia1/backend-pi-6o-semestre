import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AlunosModule } from './alunos/alunos.module';
import { AulasModule } from './aulas/aulas.module';
import { PlanosDeAulaModule } from './planos-de-aula/planos-de-aula.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carregamos o arquivo .env usando o ConfigModule
    TypeOrmModule.forRoot(config),
    UsuariosModule,
    AuthModule,
    AlunosModule,
    AulasModule,
    PlanosDeAulaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
