import { Module } from '@nestjs/common';
import { ModelCarService } from './model-car.service';
import { ModelCarController } from './model-car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelCar, ModelCarSchema } from './entities/model-car.entity';
import { CommonModule } from 'src/common/common.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: ModelCar.name, schema: ModelCarSchema }]),
    CommonModule,
    BrandModule
  ],
  controllers: [ModelCarController],
  providers: [ModelCarService],
  exports: [ModelCarService]
})
export class ModelCarModule {}
