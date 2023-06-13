import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { PaymentList, PaymentMethod } from "../types/TypePayment.type";

export class CreateCustomerDto {
    @IsString()
    fullName:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    dni:string;

    @IsString()
    cuit:string;
    
    @IsString()
    address:string;

    @IsString()
    city:string;
    
    @IsString()
    province:string;  
    
    @IsString()
    @IsIn(PaymentList)
    paymentMethod:PaymentMethod;
}
