import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma.service';

import { hash } from 'bcrypt'; // encriptar
// import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    try {
      const userExisting = await this.prisma.auth_users.findUnique({
        where: {
          companyId_username: {
            companyId: createUserDto.companyId,
            username: createUserDto.userName,
          },
        },
      });

      console.log(userExisting);
      if (userExisting) {
        throw new ConflictException('Ya existe este usuario');
      }

      const { password } = createUserDto;
      const hashedPassword = await hash(password, 10);

      createUserDto = {
        ...createUserDto,
        password: hashedPassword,
      };

      return await this.prisma.auth_users.create({
        data: {
          companyId: createUserDto.companyId,
          username: createUserDto.userName,
          password: createUserDto.password,
          primaryRole: createUserDto.rolePrimary,
        },
      });
    } catch (error) {
      // Manejo adicional de la excepción
      if (error instanceof ConflictException) {
        // Puedes realizar alguna acción adicional aquí
        console.error(error.message);
        throw error; // Propagar la excepción
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;

    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    console.log(id);
    return await this.prisma.auth_users.deleteMany();
  }
}