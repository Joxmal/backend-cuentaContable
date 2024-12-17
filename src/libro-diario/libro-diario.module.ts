import { Module } from '@nestjs/common';
import { LibroDiarioService } from './libro-diario.service';
import { LibroDiarioController } from './libro-diario.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibroDiarioController],
  providers: [LibroDiarioService, PrismaService],
  exports: [LibroDiarioService],
})
export class LibroDiarioModule {}
