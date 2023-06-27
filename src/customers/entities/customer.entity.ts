import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PaymentMethod } from "../types/TypePayment.type";
import { Document } from "mongoose";

@Schema()
export class Customer {

    @Prop({
        required:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val,
    })
    fullName:string;

    @Prop({
        required:true,
        unique:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val,
    })
    email:string;

    @Prop({required:true})
    dni:string;

    @Prop({required:false})
    cuit:string;

    @Prop({required:true})
    address:string;

    @Prop({required:false})
    department:string;

    @Prop({required:true})
    zipCode:string;

    @Prop({
        required:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val,
    })
    city:string;

    @Prop({
        required:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val,
    })
    province:string; 

    @Prop({required:true})
    country:string;  
    
    @Prop({required:true})
    paymentMethod:PaymentMethod
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);