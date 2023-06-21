import { IsMongoId, IsString } from "class-validator";

export class CreateVersionModelDto {
    @IsString()
    name:string

    @IsMongoId()
    model:string    
}
