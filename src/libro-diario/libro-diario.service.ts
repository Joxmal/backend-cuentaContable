import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLibroDiarioDto } from './dto/create-libro-diario.dto';
import { UpdateLibroDiarioDto } from './dto/update-libro-diario.dto';
import { UserAuth } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { Libro_Diario } from '@prisma/client';

@Injectable()
export class LibroDiarioService {
  constructor(private prisma: PrismaService) {}

  async create(createLibroDiarioDto: CreateLibroDiarioDto, user: UserAuth) {
    console.log('ultimoAsiento');

    // en caso de que el asiento no sea enviado se colocara el ultimo asiento de la base de datos
    let ultimoAsiento: number | null = null;
    if (!createLibroDiarioDto.asiento) {
      const ultimoAsientoData = await this.prisma.libro_Diario.findFirst({
        orderBy: {
          asiento: 'desc',
        },
        select: {
          asiento: true,
        },
      });
      // si no existe asiento entonces lo inicializa en 0
      if (!ultimoAsientoData) {
        ultimoAsiento = 0;
      } else {
        ultimoAsiento = ultimoAsientoData.asiento;
      }
    }
    console.log('ultimoAsiento');

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Tipar promises con un arreglo de promesas específicas de los modelos
        const promises: Array<Promise<Libro_Diario>> = [];

        //sumamos uno al ultimo asiento colocar el siguiente en la BD
        ++ultimoAsiento;

        // Actualizar puntos de venta
        createLibroDiarioDto.createdRowLibroDiario.forEach((row) => {
          promises.push(
            prisma.libro_Diario.create({
              data: {
                asiento: createLibroDiarioDto.asiento || ultimoAsiento,
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
        try {
          const responses = await Promise.all(promises);
          console.log(responses);
          return responses;
        } catch (error) {
          console.error(error);
        }
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new ConflictException('Error interno');
    }
  }

  async findAll(user: UserAuth) {
    const dataLibroDiario = await this.prisma.libro_Diario.findMany({
      where: {
        companyId: user.companyId,
      },
    });
    // await this.prisma.libro_Diario.deleteMany();

    return dataLibroDiario;
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
