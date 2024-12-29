import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { UserAuth } from 'src/auth/auth.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto, user: UserAuth) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const permission = await prisma.permissions.create({
        data: {
          ...createRoleDto.permissions,
        },
      });

      const role = await prisma.role.create({
        data: {
          name: createRoleDto.name,
          companyId: user.companyId,
          description: createRoleDto.description,
          permissionsId: permission.id,
        },
      });

      return role;
    });

    return result;
  }

  async findAll(user: UserAuth) {
    return await this.prisma.role.findMany({
      where: {
        companyId: user.companyId,
      },
      include: {
        _count: true,
        permissions: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOneRoot() {
    return await this.prisma.role.findFirst({
      where: {
        companyId: 1,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { name, description, permissions } = updateRoleDto;
    await this.prisma.role.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        permissions: {
          update: {
            ...permissions,
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
