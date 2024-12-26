import { ConflictException, Injectable } from '@nestjs/common';

import { UserAuth } from 'src/auth/auth.service';
import { FindLibroMayorDto } from './dto/find-libro-mayor.dto';
import { PrismaService } from 'src/prisma.service';
import { LibroDiarioService } from 'src/libro-diario/libro-diario.service';
import { CuentasContablesService } from 'src/cuentas-contables/cuentas-contables.service';
import { Prisma } from '@prisma/client';

export interface FormattedEntry {
  asiento: number;
  fecha: string | Date;
  descripcion: string;
  debe: Prisma.Decimal;
  haber: Prisma.Decimal;
}

@Injectable()
export class LibroMayorService {
  constructor(
    private prisma: PrismaService,
    private libroDiarioService: LibroDiarioService,
    private cuentasContablesService: CuentasContablesService,
  ) {}

  async findAll(user: UserAuth, query: FindLibroMayorDto) {
    const libroDiario = await this.libroDiarioService.findAll(user, query);

    const cuentasContables = await this.cuentasContablesService.findAll(user);

    const ArrayCuentasIdErrors = new Set();

    const libroMapeado = libroDiario.map((diario) => {
      const cuentaContable = cuentasContables.find(
        (contable) => contable.codigo === diario.cuentaId,
      );

      if (!cuentaContable) {
        ArrayCuentasIdErrors.add(diario.cuentaId);
      }

      const mapeoName = {
        ...diario,
        cuentaName: cuentaContable?.nombre,
        naturaleza: cuentaContable.Cuenta_contable_tipo.naturaleza,
      };

      return mapeoName;
    });

    if (ArrayCuentasIdErrors.size > 0) {
      throw new ConflictException({
        statusCode: 409,
        error: 'codigos faltantes',
        message: Array.from(ArrayCuentasIdErrors),
      });
    }

    const libroMayorMap = libroMapeado.reduce(
      (acc, entry) => {
        const {
          companyId,
          cuentaName,
          naturaleza,
          asiento,
          fecha,
          descripcion,
          debe,
          haber,
        } = entry;

        // Verificar si ya existe la entrada para companyId
        if (!acc[companyId]) {
          acc[companyId] = {};
        }

        // Verificar si ya existe la entrada para cuentaId
        if (!acc[companyId][entry.cuentaId]) {
          acc[companyId][entry.cuentaId] = {
            cuentaName,
            naturaleza,
            data: [],
            debe: new Prisma.Decimal(0),
            haber: new Prisma.Decimal(0),
          };
        }

        //sumando
        if (acc[companyId][entry.cuentaId]) {
          acc[companyId][entry.cuentaId].debe = acc[companyId][
            entry.cuentaId
          ].debe.plus(new Prisma.Decimal(entry.debe));
          acc[companyId][entry.cuentaId].haber = acc[companyId][
            entry.cuentaId
          ].haber.plus(new Prisma.Decimal(entry.haber));
        }

        // Agregar la entrada formateada al array de data
        acc[companyId][entry.cuentaId].data.push({
          asiento,
          fecha,
          descripcion,
          debe,
          haber,
        });

        return acc;
      },
      {} as Record<
        number,
        Record<
          number,
          {
            cuentaName: string;
            naturaleza: boolean;
            data: FormattedEntry[];
            debe: Prisma.Decimal;
            haber: Prisma.Decimal;
          }
        >
      >,
    );

    // return libroMayorMap;

    // Convertir el resultado a un array de objetos
    const libroMayorArray = Object.entries(libroMayorMap).map(
      ([companyId, cuentas]) => ({
        companyId: Number(companyId),
        cuentasID: Object.entries(cuentas).map(
          ([cuentaId, { cuentaName, naturaleza, data, debe, haber }]) => ({
            cuentaID: Number(cuentaId),
            cuentaName,
            naturaleza,
            data,
            debe,
            haber,
            totalNeto: naturaleza ? debe.minus(haber) : haber.minus(debe),
          }),
        ),
      }),
    );

    return libroMayorArray[0];
  }
}
