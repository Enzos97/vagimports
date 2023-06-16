import { IsBase64, IsNotEmpty, Length } from "class-validator";

export class CreateUploadImageDto {
    @IsNotEmpty()
    @IsBase64()
    base64Data: string;
  
    @IsNotEmpty()
    @Length(1, 100)
    fileName: string;
}
