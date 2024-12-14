import { Injectable } from '@nestjs/common';
import { CreateLibroDiarioDto } from './dto/create-libro-diario.dto';
import { UpdateLibroDiarioDto } from './dto/update-libro-diario.dto';
import { UserAuth } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { Libro_Diario } from '@prisma/client';

@Injectable()
export class LibroDiarioService {
  constructor(private prisma: PrismaService) {}

  async create(createLibroDiarioDto: CreateLibroDiarioDto, user: UserAuth) {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Tipar promises con un arreglo de promesas específicas de los modelos
        const promises: Array<Promise<Libro_Diario>> = [];

        // Actualizar puntos de venta
        createLibroDiarioDto.createdRowLibroDiario.forEach((row) => {
          promises.push(
            prisma.libro_Diario.create({
              data: {
                asiento: createLibroDiarioDto.asiento,
                fecha: createLibroDiarioDto.fechaMovimientoDesde,
                cuentaId: row.cuentaID,
                debe: row.debe,
                haber: row.haber,
                companyId: user.companyId,
                descripcion: row.description,
              },
            }),
          );
        });

        const responses = await Promise.all(promises);
        return responses;
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  findAll(user: UserAuth) {
    return { user };

    return `This action returns all libroDiario`;
  }

  findOne(id: number, user: UserAuth) {
    return { user };

    return `This action returns a #${id} libroDiario`;
  }

  update(id: number, updateLibroDiarioDto: UpdateLibroDiarioDto) {
    return { updateLibroDiarioDto };

    return `This action updates a #${id} libroDiario`;
  }

  remove(id: number) {
    return `This action removes a #${id} libroDiario`;
  }
}
