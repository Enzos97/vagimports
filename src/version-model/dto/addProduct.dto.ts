import { IsMongoId } from "class-validator";

export class AddProductToVersionDto {
    @IsMongoId()
    versionId: string;

    @IsMongoId()
    productId: string;
}