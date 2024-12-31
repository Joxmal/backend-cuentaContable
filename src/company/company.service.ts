import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';
import { UserAuth } from 'src/auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto, user: UserAuth) {
    //si el usuario que esta creando tiene el rol SUPERADMIN
    // verifica que tenga createCompanyPermission para crear empresas
    if (user.rolePrimary === Role.SUPERADMIN) {
      const userExist = await this.prisma.auth_users.findFirst({
        where: {
          id: user.userId,
        },
      });
      // si no tiene createCompanyPermission lo rechaza
      if (!userExist.createCompanyPermission) {
        throw new ConflictException('no tienes permisos para crear empresas');
      }
    }

    // verifica que el key (llave de compañia sea unico)
    const keyExist = await this.prisma.auth_company.findFirst({
      where: {
        authKeyCompany: createCompanyDto.authKeyCompany,
      },
    });

    // verifica que el key ya existe retorna error
    if (keyExist) {
      throw new ConflictException('Esta key ya existe');
    }

    // crea la compañia segun el DTO

    const createCompany = await this.prisma.auth_company.create({
      data: {
        authKeyCompany: createCompanyDto.authKeyCompany,
        groups_company_planId: createCompanyDto.planCompanyId || undefined,
        data_company: {
          create: {
            nameCompany: createCompanyDto.data_company.nameCompany,
            description: createCompanyDto.data_company.description,
          },
        },
      },
    });

    return createCompany;
  }

  async findAll() {
    return await this.prisma.auth_company.findMany({
      include: {
        _count: true,
        groups_company_plan: true,
        data_company: true,
        auth_users: {
          include: {
            role: true,
          },
        },
        admin_logs: true,
        roles: {
          include: {
            auth_users: true,
          },
        },
      },
    });
  }

  async findOne(user: UserAuth) {
    return await this.prisma.auth_company.findUnique({
      where: {
        id: user.companyId,
      },
      include: {
        _count: true,
        groups_company_plan: true,
        data_company: true,
        auth_users: {
          include: {
            role: true,
          },
        },
        admin_logs: true,
        roles: true,
      },
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    if (updateCompanyDto) {
    }
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
