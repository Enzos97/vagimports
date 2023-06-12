import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TypeProduct } from "../types/TypeProduct.type";
import { Document, Types } from "mongoose";

@Schema()
export class Product extends Document {
    @Prop({required:true})
    brand: string;
    @Prop({required:true})
    model: string;
    @Prop({required:true})
    price: number;
    @Prop({default:0})
    discount?: number;
    @Prop({required:false})
    images: string[];
    @Prop({required:true})
    title: string;
    @Prop({required:true})
    category: string;
    @Prop({required:false,default:""})
    description: string;
    @Prop({required:true,default:0})
    currentStock: number;
    @Prop({default:true})
    freeShipping: boolean;
    @Prop({required:false, default:""})
    color: string;
    @Prop({default:TypeProduct.NEW})
    type: TypeProduct
    @Prop({default:false})
    outstanding?: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);