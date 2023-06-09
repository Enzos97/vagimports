import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

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
  //nuevo cambio

  async findOne(term: string) {
    try {
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

      if(!category){
        throw new NotFoundException('la categoria no existe.')
      }
      return category;
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async addProduct(addProductDto:AddProductDto){
    try {
      const addProduct = await this.categoryModel.findByIdAndUpdate(
        addProductDto.categoryId,
        { $push: { products: addProductDto.productId} },
        { new: true },
      );
      return addProduct
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto,{new:true})
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.categoryModel.findByIdAndRemove(id)
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
}
