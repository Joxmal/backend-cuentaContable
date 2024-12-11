import { IsOptional,IsPositive,Min, IsNumber } from "class-validator"

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    offset?:number
}