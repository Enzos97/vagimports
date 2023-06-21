import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";
import { StatusTypes } from "src/purchase/types/StatusTypes.type";
import { SortDirection } from "src/common/types/sort.type";

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
    category:string;

    @IsOptional()
    @IsString()
    brand?:string

    @IsOptional()
    @IsString()
    model?:string

    @IsOptional()
    @IsString()
    search?:string

    @IsOptional()
    @IsString()
    orderDate:SortDirection

    @IsOptional()
    @IsString()
    totalWithOutDiscount:SortDirection
    
    @IsOptional()
    @IsString()
    status:StatusTypes
}