import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class VersionModel extends Document {
    @Prop({
        require:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val
    })
    name:string;

    @Prop({ type: Types.ObjectId, ref: 'Brand' })
    model: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products:Types.ObjectId[];
}

export const VersionModelSchema = SchemaFactory.createForClass(VersionModel);