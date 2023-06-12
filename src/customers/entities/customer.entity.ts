import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PaymentMethod } from "../types/TypePayment.type";
import { Document } from "mongoose";

@Schema()
export class Customer extends Document{
    @Prop({required:true})
    fullName:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true})
    dni:string;
    @Prop({required:true})
    cuit:string;
    @Prop({required:true})
    address:string;
    @Prop({required:true})
    city:string;
    @Prop({required:true})
    province:string;  
    @Prop({required:true})
    paymentMethod:PaymentMethod
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);