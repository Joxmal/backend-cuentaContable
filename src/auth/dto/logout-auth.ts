import { IsString } from 'class-validator';

export class LogoutAuthDto {
  @IsString()
  id: string;

  @IsString()
  token: string;
}
