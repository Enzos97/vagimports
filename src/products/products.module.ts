import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { CategoryModule } from 'src/Category/Category.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CommonModule,
    CategoryModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService,MongooseModule]
})
export class ProductsModule {}
