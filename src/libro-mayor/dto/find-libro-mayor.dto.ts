import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class FindLibroMayorDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaMovimientoDesde?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaMovimientoHasta?: Date;
}