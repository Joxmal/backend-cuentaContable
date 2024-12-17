import { Module } from '@nestjs/common';
import { CuentasContablesService } from './cuentas-contables.service';
import { CuentasContablesController } from './cuentas-contables.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CuentasContablesController],
  providers: [CuentasContablesService, PrismaService],
  exports: [CuentasContablesService],
})
export class CuentasContablesModule {}
