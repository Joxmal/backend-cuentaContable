import { IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  authKeyCompany: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  Userpassword?: string;
}
