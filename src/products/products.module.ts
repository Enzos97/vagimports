import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { CategoryModule } from 'src/category/category.module';
import { ModelCarModule } from 'src/model-car/model-car.module';
import { VersionModelModule } from 'src/version-model/version-model.module';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { AdminModule } from 'src/admin/admin.module';



@Module({
  imports: [
  MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CommonModule,
    CategoryModule,
    ModelCarModule,
    VersionModelModule,
    UploadImageModule,
    AdminModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService,MongooseModule]
})
export class ProductsModule {}
