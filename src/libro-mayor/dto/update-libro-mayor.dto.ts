import { PartialType } from '@nestjs/swagger';
import { CreateLibroMayorDto } from './create-libro-mayor.dto';

export class UpdateLibroMayorDto extends PartialType(CreateLibroMayorDto) {}
