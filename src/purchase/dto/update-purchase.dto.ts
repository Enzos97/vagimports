import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { IsArray, IsNumber, IsOptional, Max } from 'class-validator';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
    @IsOptional()
    @IsArray()
    proofOfPayment:string[]
}
