import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLibroDiarioDto {
  @IsOptional()
  @IsNumber()
  asiento?: number;

  @ValidateNested()
  @Type(() => createdRowLibroDiario)
  createdRowLibroDiario: createdRowLibroDiario[];

  @IsDate()
  @Type(() => Date)
  fechaMovimientoDesde: Date;
}

class createdRowLibroDiario {
  @IsNumber()
  cuentaID: number;

  @IsNumber()
  debe: number;

  @IsNumber()
  haber: number;

  @IsOptional()
  @IsString()
  description?: string;
}
