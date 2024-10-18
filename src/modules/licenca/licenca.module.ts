import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicencaService } from './licenca.service';
import { LicencaController } from './licenca.controller';
import { Licenca } from './licenca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Licenca])],
  providers: [LicencaService],
  controllers: [LicencaController],
})
export class LicencaModule {}