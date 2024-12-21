import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyPlanService } from './company-plan.service';
import { CreateCompanyPlanDto } from './dto/create-company-plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company-plan.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Modulo COMPANY-PLAN')
@ApiBearerAuth()
@Controller('company-plan')
export class CompanyPlanController {
  constructor(private readonly companyPlanService: CompanyPlanService) {}

  @Auth(Role.ROOT)
  @Post()
  create(@Body() createCompanyPlanDto: CreateCompanyPlanDto) {
    return this.companyPlanService.create(createCompanyPlanDto);
  }

  @Auth(Role.ROOT)
  @Get()
  findAll() {
    return this.companyPlanService.findAll();
  }

  @Auth(Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyPlanService.findOne(+id);
  }

  @Auth(Role.ROOT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyPlanDto: UpdateCompanyPlanDto,
  ) {
    return this.companyPlanService.update(+id, updateCompanyPlanDto);
  }

  @Auth(Role.ROOT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyPlanService.remove(+id);
  }
}
