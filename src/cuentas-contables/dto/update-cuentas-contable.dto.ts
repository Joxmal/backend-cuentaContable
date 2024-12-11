import { PartialType } from '@nestjs/swagger';
import { CreateCuentasContableDto } from './create-cuentas-contable.dto';

export class UpdateCuentasContableDto extends PartialType(CreateCuentasContableDto) {}
