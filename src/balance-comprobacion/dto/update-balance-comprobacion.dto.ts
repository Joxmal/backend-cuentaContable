import { PartialType } from '@nestjs/swagger';
import { CreateBalanceComprobacionDto } from './create-balance-comprobacion.dto';

export class UpdateBalanceComprobacionDto extends PartialType(CreateBalanceComprobacionDto) {}
