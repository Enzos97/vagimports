import { PartialType } from '@nestjs/mapped-types';
import { CreateModelCarDto } from './create-model-car.dto';

export class UpdateModelCarDto extends PartialType(CreateModelCarDto) {}
