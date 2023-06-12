import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { isMongoId } from 'class-validator';
import { AddProductDto } from './dto/addProduct.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel : Model<Category>,
    private readonly commonService:CommonService
  ){}
  async create(createCategoryDto:CreateCategoryDto ) {
    try {
      const newCategory = await this.categoryModel.create(createCategoryDto)
      return newCategory
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      return await this.categoryModel.find().populate('products');
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findOne(term: string) {
    let category:Category|Category[];
    if (isMongoId(term)) {
      // Si el identificador es un ID de MongoDB válido
      category = await this.categoryModel.findById(term).exec();
    } else {
      // Si el identificador es el nombre de la categoría
      category = await this.categoryModel.find( {"name":
      { $regex: new RegExp("^" + term, "i") } })
      category=category[0]
    }
    return category;
  }

  async addProduct(addProductDto:AddProductDto){
    const addProduct = await this.categoryModel.findByIdAndUpdate(
      addProductDto.categoryId,
      { $push: { products: addProductDto.productId} },
      { new: true },
    );
    return addProduct
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} falopa`;
  }

  remove(id: string) {
    return `This action removes a #${id} falopa`;
  }
}
