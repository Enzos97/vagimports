import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { IsString } from 'class-validator';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
    @IsString()
    proofofpayment:string;
}
