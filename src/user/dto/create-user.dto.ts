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
  first_name: string;

  @IsString()
  @IsNotEmpty()
  second_name: string;

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
