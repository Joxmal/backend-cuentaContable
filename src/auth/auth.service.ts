import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

// import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

import { PrismaService } from 'src/prisma.service';
/* import { token } from 'morgan';
import { LogoutAuthDto } from './dto/logout-auth'; */

import { Role } from 'src/common/enums/rol.enum';
import { $Enums } from '@prisma/client';

export interface Payload {
  userId: number;
  company: number;
  companyId: number;
  user: string;
  rolePrimary: $Enums.PrimaryRole;
  roleCompanyId: {
    name: string;
    permissionsId: number;
  };
}

export interface UserAuth {
  userId: number;
  company: string;
  companyId: number;
  user: string;
  rolePrimary: Role;
  roleCompanyId: {
    name: string;
    permissionsId: number;
  };
  iat: string;
  exp: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(user: LoginAuthDto) {
    const CompanyExisting = await this.prisma.auth_company.findUnique({
      where: {
        authKeyCompany: user.authKeyCompany,
        auth_users: {
          some: {
            username: user.username,
            is_active: true,
          },
        },
      },
      include: {
        auth_users: {
          select: {
            id: true,
            companyId: true,
            username: true,
            password: true,
            first_name: true,
            second_name: true,
            primaryRole: true,
            role: {
              select: {
                name: true,
                permissionsId: true,
              },
            },
          },
          where: {
            username: user.username,
          },
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!CompanyExisting)
      throw new HttpException('usuario no encontrado', HttpStatus.FORBIDDEN);

    // ya no se necesita el chequeo de contraseña
    // const checkPassword = await compare(
    //   user.Userpassword,
    //   userExist.auth_users[0].password,
    // );

    // if (!checkPassword) throw new HttpException('contraseña incorrecta', 403);

    if (CompanyExisting.auth_users[0].password !== user.Userpassword) {
      throw new HttpException('contraseña incorrecta', HttpStatus.FORBIDDEN);
    }

    const { authKeyCompany, auth_users, id } = CompanyExisting;

    const payload: Payload = {
      userId: auth_users[0].id,
      companyId: id,
      company: authKeyCompany,
      user: auth_users[0].username,
      rolePrimary: auth_users[0].primaryRole,
      roleCompanyId: auth_users[0].role,
    };

    const token = this.jwtService.sign(payload);

    delete auth_users[0].password;

    const data = {
      token,
      user: {
        firstName: auth_users[0].first_name,
        lastName: auth_users[0].first_name,
        rolePrimary: auth_users[0].primaryRole,
        roleCompany: auth_users[0].role,
      },
    };

    return data;
  }

  async decodeToken(token: string) {
    try {
      const result = await this.jwtService.verifyAsync(token); // Verifica el token
      return result; // Retorna el payload del token
    } catch (error) {
      console.error('Token inválido');
      throw new ConflictException('envio un token invalido');
    }
  }

  async decodeRawToken(token: string) {
    const decoded = (await this.jwtService.decode(token)) as UserAuth;

    // Aquí puedes hacer validaciones adicionales si es necesario
    return decoded;
  }

  // verificar que el usaurio pertenesca a la company
  async verificationUserPermission(token: string, modulo: number) {
    const tokenDecode = await this.decodeRawToken(token);
    console.log(modulo);
    // TODO: implementar la validación de seguridad y seguridad adicional

    return tokenDecode;

    return true; // por ejemplo, devuelve true si el usuario pertenece a la compañía
  }
}
