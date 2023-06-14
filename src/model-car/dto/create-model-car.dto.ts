import { IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateModelCarDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    image:string

    @IsMongoId()
    brand:string
}
