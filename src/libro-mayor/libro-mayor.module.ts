import { Module } from '@nestjs/common';
import { LibroMayorService } from './libro-mayor.service';
import { LibroMayorController } from './libro-mayor.controller';
import { PrismaService } from 'src/prisma.service';
import { LibroDiarioModule } from 'src/libro-diario/libro-diario.module';
import { CuentasContablesModule } from 'src/cuentas-contables/cuentas-contables.module';

@Module({
  controllers: [LibroMayorController],
  providers: [LibroMayorService, PrismaService],
  imports: [LibroDiarioModule, CuentasContablesModule],
  exports: [LibroMayorService],
})
export class LibroMayorModule {}
