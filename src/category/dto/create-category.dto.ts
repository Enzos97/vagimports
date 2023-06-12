import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(3)
    name: string;
  
    @IsOptional()
    @IsString()
    image: string;
    
    @IsOptional()
    @IsArray()
    @IsString({each:true})
    @Type(()=>String)
    products: string[]
}
