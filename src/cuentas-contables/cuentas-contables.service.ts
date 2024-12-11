import { Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { cuentasPrimary } from './lista/primary';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CuentasContablesService {
  constructor(private prisma: PrismaService) {}

  async create(createCuentasContableDto: CreateCuentasContableDto) {
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
          codigo: createCuentasContableDto.cod,
          nombre: createCuentasContableDto.name,
          description: createCuentasContableDto.description,
          Cuenta_contable_tipoId: cuentaTipo.codigo,
        },
      });
      return createCuentasContable;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear la cuenta contable');
    }
  }

  async findAll_Tipos() {
    let tipos = await this.prisma.cuenta_contables_tipo.findMany();
    if (tipos.length === 0) {
      const dataToInsert = cuentasPrimary.map((cuenta) => ({
        codigo: cuenta.value,
        nombre: cuenta.tipo,
        description: cuenta.description,
      }));

      await this.prisma.cuenta_contables_tipo.createMany({
        data: dataToInsert,
      });
      tipos = await this.prisma.cuenta_contables_tipo.findMany();
    }

    return tipos; // Retorna los tipos encontrados o insertados

    return cuentasPrimary;
  }

  async findAll() {
    try {
      return await this.prisma.cuenta_contables.findMany({
        orderBy: {
          codigo: 'asc',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentasContable`;
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
}
