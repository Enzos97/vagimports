import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';

export class UpdatePruebaDto extends PartialType(CreateBrandDto) {}
