import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): ObjectId {
    const isValidObjectId = Types.ObjectId.isValid(value);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return new ObjectId(value);
  }
}