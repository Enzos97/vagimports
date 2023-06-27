import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PaymentMethod } from "src/customers/types/TypePayment.type";
import { ProductQuantity } from "../interfaces/ProductQuantity.interface";
import { StatusTypes } from "../types/StatusTypes.type";

@Schema()
export class Purchase extends Document {
    @Prop({required:true})
    products:ProductQuantity[]
    @Prop({ required:true, type: Types.ObjectId, ref: 'Customer' })
    Customer:Types.ObjectId;
    @Prop({required:false})
    totalWithOutDiscount: number;
    @Prop({required:false})
    discount: number;
    @Prop({required:false})
    totalWithDiscount: number;
    @Prop({required:true})
    payType: PaymentMethod;
    @Prop({required:true})
    shiping: boolean;
    @Prop({required:false,default:Date.now})
    orderDate: Date;
    @Prop({required:false,default:Date.now})
    payDate: Date;
    @Prop({required:false,default:StatusTypes.PENDING})
    status: StatusTypes;
    @Prop({required:false,default:null})
    tokenClient:number;
    @Prop({required:false,default:null})
    proofOfPayment:string[];
    @Prop({required:false,default:false})
    isFacturaA:boolean;
}
export const PurchaseSchema = SchemaFactory.createForClass(Purchase);