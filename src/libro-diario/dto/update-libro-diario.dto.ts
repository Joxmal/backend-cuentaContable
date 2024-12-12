import { PartialType } from '@nestjs/swagger';
import { CreateLibroDiarioDto } from './create-libro-diario.dto';

export class UpdateLibroDiarioDto extends PartialType(CreateLibroDiarioDto) {}
