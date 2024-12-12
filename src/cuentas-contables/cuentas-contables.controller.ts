import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CuentasContablesService } from './cuentas-contables.service';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Modulo CUENTAS-CONTABLES')
@ApiBearerAuth()
@Auth(Role.USER)
@Controller('cuentas-contables')
export class CuentasContablesController {
  constructor(
    private readonly cuentasContablesService: CuentasContablesService,
  ) {}

  @Post()
  create(
    @Body() createCuentasContableDto: CreateCuentasContableDto,
    @ExtractToken() user: UserAuth,
  ) {
    return this.cuentasContablesService.create(createCuentasContableDto, user);
  }

  @Get()
  findAll(@ExtractToken() user: UserAuth) {
    return this.cuentasContablesService.findAll(user);
  }
  @Get('tipos')
  findAllTipos() {
    return this.cuentasContablesService.findAll_Tipos();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ExtractToken() user: UserAuth) {
    return this.cuentasContablesService.findOne(id, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCuentasContableDto: UpdateCuentasContableDto,
  ) {
    return await this.cuentasContablesService.update(
      +id,
      updateCuentasContableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasContablesService.remove(+id);
  }
}
