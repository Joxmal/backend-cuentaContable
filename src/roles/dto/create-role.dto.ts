import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Permissions {
  @IsBoolean()
  libro_mayor: boolean;

  @IsBoolean()
  libro_diario: boolean;

  @IsBoolean()
  balance_comprobacion: boolean;

  @IsBoolean()
  est_financieros: boolean;

  @IsBoolean()
  export_data: boolean;

  @IsBoolean()
  import_data: boolean;
}

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested()
  @Type(() => Permissions)
  permissions: Permissions;
}
