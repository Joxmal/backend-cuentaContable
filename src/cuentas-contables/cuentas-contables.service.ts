import { Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { cuentasPrimary } from './lista/primary';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CuentasContablesService {
  constructor(private prisma: PrismaService) {}

  async create(createCuentasContableDto: CreateCuentasContableDto) {
    const cuentaTipo = await this.prisma.cuenta_contables_tipo.findUnique({
      where: {
        codigo: createCuentasContableDto.cuentaPadreCod,
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

  findAllPrimary() {
    return cuentasPrimary;
  }

  async findAll() {
    try {
      return await this.prisma.cuenta_contables.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentasContable`;
  }

  update(id: number, updateCuentasContableDto: UpdateCuentasContableDto) {
    const data = updateCuentasContableDto;

    return {
      id: Math.floor(Math.random() * 1000) + 1,
      ...data,
    };
    return `This action updates a #${id} cuentasContable`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentasContable`;
  }
}
