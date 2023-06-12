import { IsMongoId } from "class-validator";

export class AddProductDto {
    @IsMongoId()
    categoryId: string;

    @IsMongoId()
    productId: string;
}