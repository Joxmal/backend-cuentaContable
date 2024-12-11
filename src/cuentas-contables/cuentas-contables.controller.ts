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
  @Get('primary')
  findAllPrimary() {
    return this.cuentasContablesService.findAllPrimary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasContablesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCuentasContableDto: UpdateCuentasContableDto,
  ) {
    return this.cuentasContablesService.update(+id, updateCuentasContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasContablesService.remove(+id);
  }
}
