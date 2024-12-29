import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma.service';

// import { hash } from 'bcrypt'; // encriptar
import { UserAuth } from 'src/auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';
// import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, user: UserAuth) {
    //solo los root pueden crear roles para otros usuarios de lo contrario siempre sera un user
    if (user.rolePrimary !== 'root') {
      createUserDto.rolePrimary = Role.USER;
    }

    // busca si el usuario existe
    try {
      const userExisting = await this.prisma.auth_users.findUnique({
        where: {
          companyId_username: {
            companyId: user.companyId,
            username: createUserDto.userName,
          },
        },
      });

      //si ya existe lanza un error
      if (userExisting) {
        throw new ConflictException('Ya existe este usuario');
      }

      const { password } = createUserDto;
      // const hashedPassword = await hash(password, 10);

      createUserDto = {
        ...createUserDto,
        password: password,
      };

      return await this.prisma.auth_users.create({
        data: {
          companyId: user.companyId,
          email: createUserDto.email,
          username: createUserDto.userName,
          first_name: createUserDto.first_name,
          second_name: createUserDto.second_name,
          password: createUserDto.password,
          primaryRole: createUserDto.rolePrimary,
          description: createUserDto.description,
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

  async update(id: number, updateUserDto: UpdateUserDto, user: UserAuth) {
    //solo los root pueden crear roles para otros usuarios de lo contrario siempre sera un user
    if (user.rolePrimary !== 'root') {
      updateUserDto.rolePrimary = Role.USER;
    }

    try {
      const {
        description,
        email,
        first_name,
        password,
        roleCompanyId: roleId,
        second_name,
        userName: username,
      } = updateUserDto;

      const userEdit = await this.prisma.auth_users.update({
        where: {
          id,
          is_active: true,
        },
        data: {
          description,
          email,
          first_name,
          password,
          roleId,
          second_name,
          username,
        },
      });
      return {
        message: 'Usuario actualizado correctamente',
        user: userEdit, // Puedes incluir el usuario actualizado si lo deseas
      };
    } catch (error) {
      throw new ConflictException('error al actualizar usuario');
    }
  }

  async remove(id: number) {
    const user = await this.prisma.auth_users.findUnique({
      where: { id },
      select: { is_active: true },
    });

    await this.prisma.auth_users.update({
      where: {
        id,
      },
      data: {
        is_active: !user.is_active,
      },
    });
  }
}
