import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    offset?:number;

    @IsOptional()
    @IsString()
    brand?:string

    @IsOptional()
    @IsString()
    model?:string

    @IsOptional()
    @IsString()
    search?:string
}