import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsBoolean, IsEmpty, IsIn, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Customer } from "src/customers/entities/customer.entity";
import { PaymentList, PaymentMethod } from "src/customers/types/TypePayment.type";
import { StatusList, StatusTypes } from "../types/StatusTypes.type";


export class CreatePurchaseDto {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    products:any[]

    @IsObject()
    Customer:any;

    @IsNumber()
    @IsOptional()
    totalWithOutDiscount: number;

    @IsNumber()
    @IsOptional()
    discount: number;

    @IsNumber()
    @IsOptional()
    totalWithDiscount: number;

    @IsIn(PaymentList)
    //@IsOptional()
    payType: PaymentMethod;
    
    @IsBoolean()
    //@IsEmpty()
    shiping: boolean;

    @IsString()
    @IsOptional()
    orderDate: Date;

    @IsString()
    @IsOptional()
    payDate: Date;

    @IsIn(StatusList)
    @IsOptional()
    state: StatusTypes;
    
}
