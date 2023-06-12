import { Module } from '@nestjs/common';
import { CategoryService } from './Category.service';
import { CategoryController } from './Category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports:[
    MongooseModule.forFeature([{name:Category.name, schema:CategorySchema}]),
    CommonModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
