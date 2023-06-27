import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaymentList, PaymentMethod } from "../types/TypePayment.type";

export class CreateCustomerDto {
    @IsString()
    fullName:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    dni:string;

    @IsOptional()
    @IsString()
    cuit:string;
    
    @IsString()
    address:string;

    @IsOptional()
    @IsString()
    department:string;

    @IsString()
    zipCode:string;

    @IsString()
    city:string;

    @IsString()
    country:string;  

    @IsString()
    province:string;  
    
    @IsString()
    @IsIn(PaymentList)
    paymentMethod:PaymentMethod;
}
