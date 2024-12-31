import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsNumber()
  authKeyCompany: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  Userpassword?: string;
}
