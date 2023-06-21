import { Module } from '@nestjs/common';
import { VersionModelService } from './version-model.service';
import { VersionModelController } from './version-model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionModel, VersionModelSchema } from './entities/version-model.entity';
import { CommonModule } from 'src/common/common.module';
import { ModelCarModule } from 'src/model-car/model-car.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: VersionModel.name, schema: VersionModelSchema }]),
    CommonModule,
    ModelCarModule
  ],
  controllers: [VersionModelController],
  providers: [VersionModelService],
  exports:[VersionModelService]
})
export class VersionModelModule {}
