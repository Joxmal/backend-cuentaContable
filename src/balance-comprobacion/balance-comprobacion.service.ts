import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LibroMayorService } from 'src/libro-mayor/libro-mayor.service';
import { UserAuth } from 'src/auth/auth.service';
import { FindLibroMayorDto } from 'src/libro-mayor/dto/find-libro-mayor.dto';
import { Prisma } from '@prisma/client';
import { cuentasPrimary } from 'src/cuentas-contables/lista/primary';

@Injectable()
export class BalanceComprobacionService {
  constructor(
    private prisma: PrismaService,
    private libroMayorService: LibroMayorService,
  ) {}

  async findAll(user: UserAuth, query: FindLibroMayorDto) {
    const libroMayor = await this.libroMayorService.findAll(user, query);

    if (!libroMayor) {
      return;
    }
    const codigos = [...cuentasPrimary];

    const mapeo = libroMayor.cuentasID.map((item) => {
      // Obtener el primer dígito del cuentaID
      const primerDigito = parseInt(item.cuentaID.toString()[0]);
      // Determinar el tipo de cuenta según el primer dígito
      const tipoCuenta = codigos.find(
        (cuenta) => cuenta.value === primerDigito,
      );

      const saldoDeudor = new Prisma.Decimal(item.debe).minus(item.haber);
      const saldoAcreedor = new Prisma.Decimal(item.haber).minus(item.debe);
      return {
        cuentaID: item.cuentaID,
        tipoCuenta: tipoCuenta ? tipoCuenta.tipo : 'DESCONOCIDO',
        naturalezaPrimary: tipoCuenta ? tipoCuenta.naturaleza : null,
        cuentaName: item.cuentaName,
        naturaleza: item.naturaleza,
        debe: item.debe,
        haber: item.haber,
        totalNeto: item.totalNeto,
        saldoDeudor: item.naturaleza
          ? saldoDeudor.isPositive()
            ? saldoDeudor
            : 0
          : 0,
        saldoAcreedor: !item.naturaleza
          ? saldoAcreedor.isPositive()
            ? saldoAcreedor
            : 0
          : item.naturaleza && saldoDeudor.isNegative()
            ? saldoDeudor.absoluteValue()
            : 0,
      };
    });

    const totales = mapeo.reduce(
      (acc, item) => {
        return {
          totalDebe: acc.totalDebe.plus(item.debe),
          totalHaber: acc.totalHaber.plus(item.haber),
          totalSaldoDeudor: acc.totalSaldoDeudor.plus(item.saldoDeudor),
          totalSaldoAcreedor: acc.totalSaldoAcreedor.plus(item.saldoAcreedor),
        };
      },
      {
        totalDebe: new Prisma.Decimal(0),
        totalHaber: new Prisma.Decimal(0),
        totalSaldoDeudor: new Prisma.Decimal(0),
        totalSaldoAcreedor: new Prisma.Decimal(0),
      },
    );

    const objeto = {
      mapeo,
      totales,
    };

    return objeto;
  }
}
