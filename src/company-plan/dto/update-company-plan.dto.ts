import { PartialType } from '@nestjs/swagger';
import { CreateCompanyPlanDto } from './create-company-plan.dto';

export class UpdateCompanyPlanDto extends PartialType(CreateCompanyPlanDto) {}
