import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { cuentasPrimary } from './lista/primary';
import { PrismaService } from 'src/prisma.service';
import { UserAuth } from 'src/auth/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CuentasContablesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCuentasContableDto: CreateCuentasContableDto,
    user: UserAuth,
  ) {
    const primerNumero = Number(
      String(createCuentasContableDto.cuentaPadreCod)[0],
    );
    const cuentaTipo = await this.prisma.cuenta_contables_tipo.findUnique({
      where: {
        codigo: primerNumero,
      },
    });

    if (!cuentaTipo) {
      throw new Error(
        `No existe la cuenta Padre con código ${createCuentasContableDto.cod}`,
      );
    }

    try {
      const createCuentasContable = await this.prisma.cuenta_contables.create({
        data: {
          companyId: user.companyId,
          codigo: createCuentasContableDto.cod,
          nombre: createCuentasContableDto.name,
          description: createCuentasContableDto.description,
          Cuenta_contable_tipoId: cuentaTipo.codigo,
        },
      });

      return createCuentasContable;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll_Tipos() {
    let tipos = await this.prisma.cuenta_contables_tipo.findMany();

    //si cuenta_contables_tipo esta vacio lo va a crear por primera vez en la bd
    if (tipos.length === 0) {
      const dataToInsert = cuentasPrimary.map((cuenta) => ({
        codigo: cuenta.value,
        nombre: cuenta.tipo,
        description: cuenta.description,
        naturaleza: cuenta.naturaleza,
      }));

      await this.prisma.cuenta_contables_tipo.createMany({
        data: dataToInsert,
      });
      tipos = await this.prisma.cuenta_contables_tipo.findMany();
    }

    return tipos; // Retorna los tipos encontrados o insertados
  }

  async findAll(user: UserAuth) {
    //TODO: darle uso al user
    try {
      return await this.prisma.cuenta_contables.findMany({
        where: {
          companyId: user.companyId,
        },
        include: {
          Cuenta_contable_tipo: true,
        },
        orderBy: {
          codigo: 'asc',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number, user: UserAuth) {
    return `This action returns a #${id + user.company} cuentasContable`;
  }

  async update(id: number, updateCuentasContableDto: UpdateCuentasContableDto) {
    try {
      return await this.prisma.cuenta_contables.update({
        where: {
          id,
        },
        data: {
          codigo: updateCuentasContableDto.cod,
          nombre: updateCuentasContableDto.name,
          description: updateCuentasContableDto.description,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al Editar la cuenta contable');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.cuenta_contables.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar la cuenta contable');
    }
  }

  private handlePrismaError(e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ConflictException('Cuenta ya creada');
      } else if (e.code === 'P2025') {
        throw new ConflictException('Cuenta no encontrada');
      }
    } else {
      console.error(e);
    }
    throw new InternalServerErrorException(e.message);
  }
}
