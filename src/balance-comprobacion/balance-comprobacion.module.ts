import { Module } from '@nestjs/common';
import { BalanceComprobacionService } from './balance-comprobacion.service';
import { BalanceComprobacionController } from './balance-comprobacion.controller';
import { PrismaService } from 'src/prisma.service';
import { LibroMayorModule } from 'src/libro-mayor/libro-mayor.module';

@Module({
  controllers: [BalanceComprobacionController],
  providers: [BalanceComprobacionService, PrismaService],
  imports: [LibroMayorModule],
  exports: [BalanceComprobacionService],
})
export class BalanceComprobacionModule {}
