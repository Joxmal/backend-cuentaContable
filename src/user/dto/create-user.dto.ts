import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';
export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'admin', 'superAdmin', 'root'])
  rolePrimary: Role;

  @IsOptional()
  @IsNumber()
  roleCompanyId: number;
}
