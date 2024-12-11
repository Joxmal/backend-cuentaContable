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

@Controller('cuentas-contables')
export class CuentasContablesController {
  constructor(
    private readonly cuentasContablesService: CuentasContablesService,
  ) {}

  @Post()
  create(@Body() createCuentasContableDto: CreateCuentasContableDto) {
    return this.cuentasContablesService.create(createCuentasContableDto);
  }

  @Get()
  findAll() {
    return this.cuentasContablesService.findAll();
  }
  @Get('tipos')
  findAllTipos() {
    return this.cuentasContablesService.findAll_Tipos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cuentasContablesService.findOne(id);
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
