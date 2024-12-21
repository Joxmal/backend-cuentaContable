import { Module } from '@nestjs/common';
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlanController } from './company-plan.controller';
import { PrismaService } from 'src/prisma.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Modulo COMPANY-PLAN')
@ApiBearerAuth()
@Module({
  controllers: [CompanyPlanController],
  providers: [CompanyPlanService, PrismaService],
})
export class CompanyPlanModule {}
