import { IsString, IsNumber, IsOptional,IsArray, IsBoolean, IsIn} from "class-validator";
import { Type } from "class-transformer";
import { TypeProduct, typeList } from "../types/TypeProduct.type";

export class CreateProductDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    version: string
    
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    discount?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    images: string[];

    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    description: string;

    @IsNumber()
    currentStock: number;

    @IsBoolean()
    freeShipping: boolean;
    @IsString()
    color: string;
    
    @IsOptional()
    @IsIn(typeList)
    type: TypeProduct;

    @IsOptional()
    @IsBoolean()
    outstanding?: boolean;
}
