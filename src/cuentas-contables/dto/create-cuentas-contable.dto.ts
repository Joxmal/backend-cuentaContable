import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCuentasContableDto {
  @IsNumber()
  cuentaPadreCod: number;

  @IsNumber()
  cod: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
