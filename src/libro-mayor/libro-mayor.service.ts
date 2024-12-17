import { ConflictException, Injectable } from '@nestjs/common';

import { UserAuth } from 'src/auth/auth.service';
import { FindLibroMayorDto } from './dto/find-libro-mayor.dto';
import { PrismaService } from 'src/prisma.service';
import { LibroDiarioService } from 'src/libro-diario/libro-diario.service';
import { CuentasContablesService } from 'src/cuentas-contables/cuentas-contables.service';

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

      return {
        ...diario,
        cuentaName: cuentaContable?.nombre,
      };
    });

    if (ArrayCuentasIdErrors.size > 0) {
      throw new ConflictException({
        statusCode: 409,
        error: 'codigos faltantes',
        message: Array.from(ArrayCuentasIdErrors),
      });
    }

    return libroMapeado;
  }
}
