/* import { execSync } from 'child_process';
import { createInterface } from 'readline';

import { PrismaClient, Role, Prisma } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { animalNames } from './listHelpers';

import { HelperCommon } from '../helpers/common';

interface ListaEmpleados {
  id: number;
  name: string;
  role: Role | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
[];
interface ListaAgencias {
  id: number;
  nombre: string;
  ubicacion: string;
  correo_electronico: string;
  createdAt: Date;
  updatedAt: Date;
}
[];
interface ListaGastos {
  id: number;
  razon: string;
  monto: number;
  imagen: string | null;
  update_user: string | null;
  creador: string;
  createdAt: Date;
  updatedAt: Date;
  cierreDiarioId: number | null;
}

interface ListaEfectivos {
  id: number;
  monto: number;
  update_user: string | null;
  creador: string;
  createdAt: Date;
  updatedAt: Date;
  cierreDiarioId: number | null;
}

interface ListaPagosMoviles {
  id: number;
  referencia: string;
  descripsion: string | null;
  monto: number;
  bancoReceptor: string;
  bancoEmisor: string;
  update_user: string | null;
  creador: string;
  createdAt: Date;
  updatedAt: Date;
  cierreDiarioId: number | null;
}
interface ListaPuntosVentas {
  id: number;
  monto: number;
  descripsion: string | null;
  update_user: string | null;
  creador: string;
  createdAt: Date;
  updatedAt: Date;
  cierreDiarioId: number | null;
}

interface ListaProgramas {
  id: number;
  nombre: string;
  imagen: string | null;
  ganancia_neta: number;
  utilidad: number;
  juegoDolares: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class ServiceSeed {
  private prisma: PrismaClient;
  private helperCommon: HelperCommon;

  constructor() {
    this.prisma = new PrismaClient();
    this.helperCommon = new HelperCommon();
  }

  async ResetDataBase(): Promise<void> {
    await this.prisma.$disconnect();

    // Mostrar advertencia al usuario y solicitar confirmación
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const message =
      '\x1b[31m¡ATENCIÓN Se va a resetear la base de datos. Esto eliminará todos los datos. ¿Estás seguro de que deseas continuar? (y/n)\x1b[0m';

    return new Promise((resolve) => {
      rl.question(message, (answer) => {
        if (answer.toLowerCase() === 'y') {
          // Ejecutar el comando para resetear la base de datos con la opción --force
          const resetCommand = 'npx prisma migrate reset --force';
          execSync(resetCommand, { stdio: 'inherit' });

          // Reconectar el cliente de Prisma
          this.prisma = new PrismaClient();

          console.log('Base de datos reseteada con éxito.');
        } else {
          console.log('Operación cancelada.');
          process.exit(0);
        }

        rl.close();
        resolve();
      });
    });
  }

  async createUsers(amountOfUsers: number, role: Role) {
    const users: Prisma.UserCreateInput[] = [];

    for (let i = 0; i < amountOfUsers; i++) {
      const fullName = `${faker.person.fullName()} ${faker.person.fullName()} ${faker.person.fullName()}`;

      const user: Prisma.UserCreateInput = {
        name: fullName,
        password:
          '$2b$10$y2A7o3IS218LibgjBSBzfugEqwVSBeOu/RRqbmeNn07xviWM9JrcC',
        role: role,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        dataUser: {
          create: {
            foto: faker.image.url(),
            nro_tlf: faker.phone.number(),
          },
        },
      };

      users.push(user);
    }

    return await this.prisma.$transaction(
      users.map((user) => this.prisma.user.create({ data: user })),
    );
  }

  async createSuperAdmin() {
    return await this.prisma.user.create({
      data: {
        name: 'joxmal',
        password:
          '$2b$10$y2A7o3IS218LibgjBSBzfugEqwVSBeOu/RRqbmeNn07xviWM9JrcC',
        role: Role.superAdmin,
        dataUser: {
          create: {
            nro_tlf: '0987654321',
            foto: 'url_foto_admin1',
          },
        },
      },
    });
  }

  async crearAgencias(
    amountOfAgencias: number,
    listaEmpleados: ListaEmpleados[],
  ) {
    const agencias: Prisma.AgenciasCreateInput[] = [];

    for (let i = 0; i < amountOfAgencias; i++) {
      const numEmpleados = Math.floor(Math.random() * 2) + 2; // Genera un número aleatorio entre 2 y 3
      const empleadosSeleccionados = listaEmpleados
        .sort(() => 0.5 - Math.random())
        .slice(0, numEmpleados);
      const agencia: Prisma.AgenciasCreateInput = {
        nombre: faker.company.name(),
        ubicacion: `${faker.location.city()} ${faker.location.street()}`,
        correo_electronico: faker.internet.email(),
        empleados: {
          connect: empleadosSeleccionados.map((empleado) => ({
            id: empleado.id,
          })),
        },
      };

      agencias.push(agencia);
    }

    return await this.prisma.$transaction(
      agencias.map((agencia) => this.prisma.agencias.create({ data: agencia })),
    );
  }

  async crearGastos(amountOfGastos: number, listaEmpleados: ListaEmpleados[]) {
    const gastos: Prisma.GastosCreateInput[] = [];

    for (let i = 0; i < amountOfGastos; i++) {
      const indiceAleatorio = Math.floor(Math.random() * listaEmpleados.length);
      const indiceAleatorio2 = Math.floor(
        Math.random() * listaEmpleados.length,
      );
      const empleadoAleatorio = listaEmpleados[indiceAleatorio];
      const empleadoAleatorio2 = listaEmpleados[indiceAleatorio2];
      const gasto: Prisma.GastosCreateInput = {
        creador: empleadoAleatorio.name,
        monto: faker.number.float({ min: 2, max: 700 }),
        razon: faker.lorem.sentence().split(' ').slice(0, 20).join(' '),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        imagen: faker.image.url(),
        update_user: empleadoAleatorio2.name,
      };

      gastos.push(gasto);
    }

    return await this.prisma.$transaction(
      gastos.map((gasto) => this.prisma.gastos.create({ data: gasto })),
    );
  }

  async crearEfectivos(
    amountOfEfectivos: number,
    listaEmpleados: ListaEmpleados[],
  ) {
    const efectivos: Prisma.EfectivoCreateInput[] = [];
    for (let i = 0; i < amountOfEfectivos; i++) {
      const indiceAleatorio = Math.floor(Math.random() * listaEmpleados.length);
      const indiceAleatorio2 = Math.floor(
        Math.random() * listaEmpleados.length,
      );
      const empleadoAleatorio = listaEmpleados[indiceAleatorio];
      const empleadoAleatorio2 = listaEmpleados[indiceAleatorio2];

      const efectivo: Prisma.EfectivoCreateInput = {
        creador: empleadoAleatorio.name,
        monto: faker.number.float({ min: 2, max: 700 }),
        update_user: empleadoAleatorio2.name,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      efectivos.push(efectivo);
    }

    return await this.prisma.$transaction(
      efectivos.map((efectivo) =>
        this.prisma.efectivo.create({ data: efectivo }),
      ),
    );
  }

  async crearPagoMovil(
    amountOfPagoMovil: number,
    listaEmpleados: ListaEmpleados[],
  ) {
    const PagosMoviles: Prisma.PagoMovilCreateInput[] = [];

    for (let i = 0; i < amountOfPagoMovil; i++) {
      const indiceAleatorio = Math.floor(Math.random() * listaEmpleados.length);
      const indiceAleatorio2 = Math.floor(
        Math.random() * listaEmpleados.length,
      );
      const empleadoAleatorio = listaEmpleados[indiceAleatorio];
      const empleadoAleatorio2 = listaEmpleados[indiceAleatorio2];

      const PagoMovil: Prisma.PagoMovilCreateInput = {
        creador: empleadoAleatorio.name,
        monto: faker.number.float({ min: 2, max: 700 }),
        descripsion: faker.lorem.sentence().split(' ').slice(0, 20).join(' '),
        bancoEmisor: `${faker.company.name()} Bank`,
        bancoReceptor: `${faker.company.name()} Bank`,
        referencia: `${faker.number.int({ min: 10000000, max: 99999999 })}`,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        update_user: empleadoAleatorio2.name,
      };
      PagosMoviles.push(PagoMovil);
    }

    return await this.prisma.$transaction(
      PagosMoviles.map((PagoMovil) =>
        this.prisma.pagoMovil.create({ data: PagoMovil }),
      ),
    );
  }

  async crearPuntoVenta(
    amountOfPuntoVenta: number,
    listaEmpleados: ListaEmpleados[],
  ) {
    const PuntosVentas: Prisma.PuntoVentaCreateInput[] = [];

    for (let i = 0; i < amountOfPuntoVenta; i++) {
      const indiceAleatorio = Math.floor(Math.random() * listaEmpleados.length);
      const indiceAleatorio2 = Math.floor(
        Math.random() * listaEmpleados.length,
      );
      const empleadoAleatorio = listaEmpleados[indiceAleatorio];
      const empleadoAleatorio2 = listaEmpleados[indiceAleatorio2];

      const PuntoVenta: Prisma.PuntoVentaCreateInput = {
        creador: empleadoAleatorio.name,
        monto: faker.number.float({ min: 2, max: 700 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        descripsion: faker.lorem.sentence().split(' ').slice(0, 20).join(' '),
        update_user: empleadoAleatorio2.name,
      };

      PuntosVentas.push(PuntoVenta);
    }

    return await this.prisma.$transaction(
      PuntosVentas.map((PuntoVenta) =>
        this.prisma.puntoVenta.create({ data: PuntoVenta }),
      ),
    );
  }

  async crearProgramas(
    amountOfProgramas: number,
    listaAgencia: ListaAgencias[],
  ) {
    const Programas: Prisma.ProgramasCreateInput[] = [];

    for (let i = 0; i < amountOfProgramas; i++) {
      const Programa: Prisma.ProgramasCreateInput = {
        nombre: `${faker.helpers.arrayElement(animalNames)} ${i + 1}`,
        ganancia_neta: faker.number.int({ min: 1, max: 20 }),
        juegoDolares: faker.datatype.boolean(),
        utilidad: faker.number.int({ min: 1, max: 20 }),
        agencia: {
          connect: listaAgencia.map((agencia) => ({ id: agencia.id })),
        },

        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        imagen: faker.image.url(),
      };

      Programas.push(Programa);
    }

    return await this.prisma.$transaction(
      Programas.map((Programa) =>
        this.prisma.programas.create({ data: Programa }),
      ),
    );
  }

  async CrearCierreDiario_justificacion_grupo({
    amountOfCierreDiario,
    listaAgencia,
    listaEmpleados,
    listaGastos,
    listasEfectivo,
    listaPagoMovil,
    listaPuntoVenta,
  }: {
    amountOfCierreDiario: number;
    listaAgencia?: ListaAgencias[];
    listaEmpleados?: ListaEmpleados[];
    listaGastos?: ListaGastos[];
    listasEfectivo?: ListaEfectivos[];
    listaPagoMovil?: ListaPagosMoviles[];
    listaPuntoVenta?: ListaPuntosVentas[];
  }) {
    const cierresDiarios: Prisma.CierreDiario_Justificacion_GrupoCreateInput[] =
      [];

    for (let i = 0; i < amountOfCierreDiario; i++) {
      const cierreDiario: Prisma.CierreDiario_Justificacion_GrupoCreateInput = {
        agencia: {
          connect: {
            id: this.helperCommon.obtenerElementoAleatorio(listaAgencia).id,
          },
        },
        creador:
          this.helperCommon.obtenerElementoAleatorio(listaEmpleados).name,
        efectivo: {
          connect: this.helperCommon
            .repetirElementoAleatorio(listasEfectivo, 5, 20)
            .map((efectivo) => ({ id: efectivo.id })),
        },
        gastos: {
          connect: this.helperCommon
            .repetirElementoAleatorio(listaGastos, 5, 20)
            .map((gasto) => ({ id: gasto.id })),
        },
        pagoMovil: {
          connect: this.helperCommon
            .repetirElementoAleatorio(listaPagoMovil, 6, 20)
            .map((pagoMovil) => ({ id: pagoMovil.id })),
        },
        puntoVenta: {
          connect: this.helperCommon
            .repetirElementoAleatorio(listaPuntoVenta, 5, 20)
            .map((puntoVenta) => ({ id: puntoVenta.id })),
        },

        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      cierresDiarios.push(cierreDiario);
    }

    const data = await this.prisma.$transaction(
      cierresDiarios.map((cierreDiario) =>
        this.prisma.cierreDiario_Justificacion_Grupo.create({
          data: cierreDiario,
        }),
      ),
    );
    return data;
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

async function main() {
  try {
    const serviceSeed = new ServiceSeed();

    // Borrar todo
    await serviceSeed.ResetDataBase();

    // Crear usuarios
    const usersList = await serviceSeed.createUsers(200, 'user');
    // console.log(usersList)

    // Crear SuperAdmin
    const superAdmin = await serviceSeed.createSuperAdmin();

    // Crear agencias (pendiente de implementación)
    const agenciasList = await serviceSeed.crearAgencias(50, usersList);

    // crear Gastos
    const gastosList = await serviceSeed.crearGastos(2000, usersList);

    // crear Efectivos
    const listaEfectivos = await serviceSeed.crearEfectivos(2000, usersList);

    // crear PagoMovil
    const listaPagosMoviles = await serviceSeed.crearPagoMovil(2000, usersList);

    //crear PuntoVenta
    const listaPuntosVentas = await serviceSeed.crearPuntoVenta(
      2000,
      usersList,
    );

    //crear Programas
    const listaProgramas = await serviceSeed.crearProgramas(30, agenciasList);

    //crear Cierre Diario grupo de la justificacion
    const ListaCierreDiario_justificacion_grupo =
      await serviceSeed.CrearCierreDiario_justificacion_grupo({
        amountOfCierreDiario: 100,
        listaAgencia: agenciasList,
        listaEmpleados: usersList,
        listasEfectivo: listaEfectivos,
        listaGastos: gastosList,
        listaPagoMovil: listaPagosMoviles,
        listaPuntoVenta: listaPuntosVentas,
      });
  } catch (e) {
    console.error(e);
  } finally {
    const serviceSeed = new ServiceSeed();
    await serviceSeed.disconnect();
    console.log('finalizado');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
 */
