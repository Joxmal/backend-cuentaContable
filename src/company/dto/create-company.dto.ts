import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class Data_company {
  @IsString()
  nameCompany: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateCompanyDto {
  @IsString()
  authKeyCompany: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Data_company)
  data_company?: Data_company;
}
