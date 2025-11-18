import { Module } from '@nestjs/common';
import { PlanosDeAulaService } from './planos-de-aula.service';
import { PlanosDeAulaController } from './planos-de-aula.controller';
import { PlanosDeAula } from './entities/planos-de-aula.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from 'src/aulas/entities/aula.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanosDeAula, Aula]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [PlanosDeAulaController],
  providers: [PlanosDeAulaService],
  exports: [PlanosDeAulaService],
})
export class PlanosDeAulaModule {}
