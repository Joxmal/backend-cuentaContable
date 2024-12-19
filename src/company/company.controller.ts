import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';

@ApiTags('Modulo COMPANY')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Auth(Role.SUPERADMIN)
  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @ExtractToken() user: UserAuth,
  ) {
    return this.companyService.create(createCompanyDto, user);
  }

  @Auth(Role.ROOT)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Auth(Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Auth(Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Auth(Role.ROOT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
