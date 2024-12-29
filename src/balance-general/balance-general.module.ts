import { Module } from '@nestjs/common';
import { BalanceGeneralService } from './balance-general.service';
import { BalanceGeneralController } from './balance-general.controller';
import { PrismaService } from 'src/prisma.service';
import { BalanceComprobacionModule } from 'src/balance-comprobacion/balance-comprobacion.module';

@Module({
  controllers: [BalanceGeneralController],
  providers: [BalanceGeneralService, PrismaService],
  imports: [BalanceComprobacionModule],
})
export class BalanceGeneralModule {}
