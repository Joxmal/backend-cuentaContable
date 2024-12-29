import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserAuth } from 'src/auth/auth.service';
import { BalanceComprobacionService } from 'src/balance-comprobacion/balance-comprobacion.service';
import { FindForDateTimeDto } from 'src/common/dto/findForDateTime.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BalanceGeneralService {
  constructor(
    private prisma: PrismaService,
    private balanceComprobacionService: BalanceComprobacionService,
  ) {}

  async findAll(user: UserAuth, query: FindForDateTimeDto) {
    const balanceComprobacion = await this.balanceComprobacionService.findAll(
      user,
      query,
    );

    const categorias = {
      activos: [] as typeof balanceComprobacion.mapeo,
      pasivos: [] as typeof balanceComprobacion.mapeo,
      patrimonio: [] as typeof balanceComprobacion.mapeo,
      ingresos: [] as typeof balanceComprobacion.mapeo,
      gastos: [] as typeof balanceComprobacion.mapeo,
    };

    balanceComprobacion.mapeo.forEach((item) => {
      switch (item.tipoCuenta) {
        case 'ACTIVO':
          categorias.activos.push(item);
          break;
        case 'PASIVO':
          categorias.pasivos.push(item);
          break;
        case 'PATRIMONIO':
          categorias.patrimonio.push(item);
          break;
        case 'INGRESOS':
          categorias.ingresos.push(item);
          break;
        case 'GASTOS':
          categorias.gastos.push(item);
          break;
      }
    });

    const reduceMapeo = balanceComprobacion.mapeo.reduce(
      (acc, item) => {
        const newAcc = {
          activos: {
            totalActivo: acc.activos.totalActivo.plus(
              item.tipoCuenta === 'ACTIVO' ? item.totalNeto : 0,
            ),
          },
          pasivo_patrimonio: {
            capitalSocial: acc.pasivo_patrimonio.capitalSocial.plus(
              item.tipoCuenta === 'PATRIMONIO' ? item.totalNeto : 0,
            ),
            pasivo: acc.pasivo_patrimonio.pasivo.plus(
              item.tipoCuenta === 'PASIVO' ? item.totalNeto : 0,
            ),
            totalIngreso: acc.pasivo_patrimonio.totalIngreso.plus(
              item.tipoCuenta === 'INGRESOS' ? item.totalNeto : 0,
            ),
            totalGastos: acc.pasivo_patrimonio.totalGastos.plus(
              item.tipoCuenta === 'GASTOS' ? item.totalNeto : 0,
            ),
            utilidadEjercico: acc.pasivo_patrimonio.utilidadEjercico
              .plus(item.tipoCuenta === 'INGRESOS' ? item.totalNeto : 0)
              .minus(item.tipoCuenta === 'GASTOS' ? item.totalNeto : 0),
            total_pasivo_patrimonio: new Prisma.Decimal(0),
          },
        };
        const { capitalSocial, pasivo, utilidadEjercico } =
          newAcc.pasivo_patrimonio;

        // Calcular el total de pasivo y patrimonio
        // Calcular el total de pasivo y patrimonio
        newAcc.pasivo_patrimonio.total_pasivo_patrimonio = capitalSocial
          .plus(pasivo)
          .plus(utilidadEjercico);

        return newAcc;
      },
      {
        activos: { totalActivo: new Prisma.Decimal(0) },
        pasivo_patrimonio: {
          capitalSocial: new Prisma.Decimal(0),
          pasivo: new Prisma.Decimal(0),
          totalIngreso: new Prisma.Decimal(0),
          totalGastos: new Prisma.Decimal(0),
          utilidadEjercico: new Prisma.Decimal(0),
          total_pasivo_patrimonio: new Prisma.Decimal(0),
        },
      },
    );
    return {
      ...categorias,
      totales: reduceMapeo,
    };
  }
}
