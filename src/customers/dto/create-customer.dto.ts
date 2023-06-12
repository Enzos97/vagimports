import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { PaymentList, PaymentMethod } from "../types/TypePayment.type";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    fullName:string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    dni:string;

    @IsString()
    @IsNotEmpty()
    cuit:string;
    
    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    city:string;
    
    @IsString()
    @IsNotEmpty()
    province:string;  
    
    @IsString()
    @IsIn(PaymentList)
    @IsNotEmpty()
    paymentMethod:PaymentMethod;
}
