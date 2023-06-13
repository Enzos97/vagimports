import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Models } from "src/prueba/interfaces/models.interface";

export class CreateBrandDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    image?:string

    @IsOptional()
    @IsArray()
    models:Models[]
}
