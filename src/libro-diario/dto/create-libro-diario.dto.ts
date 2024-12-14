import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLibroDiarioDto {
  @IsNumber()
  asiento: number;

  @IsDate()
  @Type(() => Date)
  fechaMovimientoDesde: Date;

  @ValidateNested()
  @Type(() => createdRowLibroDiario)
  createdRowLibroDiario: createdRowLibroDiario[];
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
