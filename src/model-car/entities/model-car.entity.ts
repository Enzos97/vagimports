import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema()
export class ModelCar extends Document {
    @Prop({
        require:true,
        set: (val: string) => val.toLowerCase().trim(),
        get: (val: string) => val
    })
    name:string;

    @Prop({required:false})
    image:string

    @Prop({ type: Types.ObjectId, ref: 'Brand' })
    brand: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'VersionModel' }] })
    versions: Types.ObjectId[];
}

export const ModelCarSchema = SchemaFactory.createForClass(ModelCar);
