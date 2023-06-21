import { PartialType } from '@nestjs/mapped-types';
import { CreateVersionModelDto } from './create-version-model.dto';

export class UpdateVersionModelDto extends PartialType(CreateVersionModelDto) {}
