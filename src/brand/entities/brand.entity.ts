import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Models } from "src/brand/interfaces/models.interface";

@Schema()
export class Brand {
    @Prop({
        required:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val
    })
    name:string;

    @Prop({required:false})
    image:string;
    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'ModelCar' }] })
    models: Types.ObjectId[]|any;
    // @Prop({required:false})
    // models:Models[]

}
export const BrandSchema = SchemaFactory.createForClass(Brand);
