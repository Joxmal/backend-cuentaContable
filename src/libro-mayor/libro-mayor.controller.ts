import { Controller, Get, Query } from '@nestjs/common';
import { LibroMayorService } from './libro-mayor.service';

import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { FindLibroMayorDto } from './dto/find-libro-mayor.dto';
import { UserAuth } from 'src/auth/auth.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Auth(Role.USER)
@ApiTags('Modulo LIBRO-MAYOR')
@ApiBearerAuth()
@Controller('libro-mayor')
export class LibroMayorController {
  constructor(private readonly libroMayorService: LibroMayorService) {}

  @Get()
  findAll(@ExtractToken() user: UserAuth, @Query() query: FindLibroMayorDto) {
    return this.libroMayorService.findAll(user, query);
  }
}
