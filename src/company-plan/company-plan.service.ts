import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyPlanDto } from './dto/create-company-plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company-plan.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyPlanService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyPlanDto: CreateCompanyPlanDto) {
    const findPLan = await this.prisma.groups_company_plan.findUnique({
      where: {
        nombre: createCompanyPlanDto.nombre,
      },
    });

    // si el plan ya existe retornar error
    if (findPLan) throw new ConflictException('Plan ya existe');

    // Desestructuración de permisos
    const { nombre, description, Permissions } = createCompanyPlanDto;
    // Crear el nuevo plan con permisos
    const plan = await this.prisma.groups_company_plan.create({
      data: {
        nombre,
        description,
        permissions: {
          create: {
            ...Permissions,
          },
        },
      },
    });

    return plan;
  }

  async findAll() {
    return await this.prisma.groups_company_plan.findMany({
      include: {
        permissions: {
          omit: {
            id: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPlan`;
  }

  update(id: number, updateCompanyPlanDto: UpdateCompanyPlanDto) {
    if (updateCompanyPlanDto) {
    }
    return `This action updates a #${id} companyPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPlan`;
  }
}
