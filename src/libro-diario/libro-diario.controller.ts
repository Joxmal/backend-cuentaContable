import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LibroDiarioService } from './libro-diario.service';
import { CreateLibroDiarioDto } from './dto/create-libro-diario.dto';
import { UpdateLibroDiarioDto } from './dto/update-libro-diario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';

@Auth(Role.USER)
@ApiTags('Modulo LIBRO-DIARIO')
@ApiBearerAuth()
@Controller('libro-diario')
export class LibroDiarioController {
  constructor(private readonly libroDiarioService: LibroDiarioService) {}

  @Post()
  async create(
    @Body() createLibroDiarioDto: CreateLibroDiarioDto,
    @ExtractToken() user: UserAuth,
  ) {
    return await this.libroDiarioService.create(createLibroDiarioDto, user);
  }

  @Get()
  findAll(@ExtractToken() user: UserAuth) {
    return this.libroDiarioService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() user: UserAuth) {
    return this.libroDiarioService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLibroDiarioDto: UpdateLibroDiarioDto,
  ) {
    return this.libroDiarioService.update(+id, updateLibroDiarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroDiarioService.remove(+id);
  }
}
