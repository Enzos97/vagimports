import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Category {
    @Prop({unique:true,index:true,required:true})
    name:string;

    @Prop({required:false})
    image:string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] ,required:false})
    products: Types.ObjectId[];
}
export const CategorySchema = SchemaFactory.createForClass(Category)
