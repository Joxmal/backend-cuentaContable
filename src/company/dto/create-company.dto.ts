import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Data_company {
  @IsString()
  nameCompany: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateCompanyDto {
  @IsNumber()
  authKeyCompany: number;

  @IsOptional()
  @IsNumber()
  planCompanyId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Data_company)
  data_company?: Data_company;
}
