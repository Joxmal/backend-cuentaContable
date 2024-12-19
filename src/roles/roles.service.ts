import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    return 1;
  }

  async findOneRoot() {
    return await this.prisma.role.findFirst({
      where: {
        companyId: 1,
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
