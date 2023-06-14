import { IsArray } from "class-validator";
import { item } from "../interfaces/item.interface";

export class CreateMercadopagoDto {
    @IsArray()
    items:item[]
}
