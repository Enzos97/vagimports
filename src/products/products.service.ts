import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PaginationDto } from '../common/dto/pagination.dto';
import { error } from 'console';
import { CategoryService } from 'src/Category/Category.service';
import { Category } from 'src/Category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) 
    private productModel: Model<Product>,
    private commonService: CommonService,
    private categoryService: CategoryService
  ){}
  async create(createProductDto: CreateProductDto) {
    try{
      const createdProduct = await this.productModel.create(createProductDto);

      const category:any = await this.categoryService.findOne(createProductDto.category);
      console.log('category',category)
      if(!category){
        throw new NotFoundException(error)
      }
      const categoryPush = await this.categoryService.addProduct({categoryId:category._id,productId:createdProduct.id})
      console.log('categoyPush',categoryPush)
      return createdProduct;
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    try {
      const { limit = 10, offset = 0, brand, model, search } = paginationDto;

      const query = this.productModel.find();

      if (brand && model) {
        query.where('brand', brand).where('model', model);
      } else if (brand) {
        query.where('brand', brand);
      } else if (model) {
        query.where('model', model);
      }

      if (search) {
        const caseSensitiveRegex = new RegExp("^" +search, "i");
        console.log('casesensitive',caseSensitiveRegex)
        query.or([
          { brand: { $regex: caseSensitiveRegex } },
          { model: { $regex: caseSensitiveRegex } },
          { title: { $regex: caseSensitiveRegex } },
          { description: { $regex: caseSensitiveRegex } },
        ]);
      }

      const totalElements = await this.productModel.countDocuments(query).exec();

      const products = await query
        .limit(limit)
        .skip(offset)
        .sort({ no: 1 })
        .exec();

      const maxpages = Math.ceil(totalElements / limit);
      const currentpage = offset + 1;

      return {
        products,
        totalElements,
        maxpages,
        currentpage,
      };
  } catch (error) {
    this.commonService.handleExceptions(error);
  }
  }
  async findOne(id: string) {
    try{
      const producto = await this.productModel.findById(id);
      if(!producto) {
        let notFoundError = new NotFoundException('Product not found');
        this.commonService.handleExceptions(notFoundError)
      }
      return producto
    }catch(error){
      this.commonService.handleExceptions(error)
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updateProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
      return updateProduct
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.productModel.findByIdAndRemove(id).exec();
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  //helpers
  // async save(category: Category): Promise<Category> {
  //   const savedCategory = await category.save();
  //   return savedCategory;
  // }

  async createProducts() {
    const productsData = [
      {
        brand: 'Volkswagen',
        model: 'Up',
        price: 15000,
        images: ['up1.jpg', 'up2.jpg'],
        title: 'Volkswagen Up',
        category: 'Autos',
        description: 'Un automóvil compacto y ágil.',
        currentStock: 10,
        freeShipping: true,
        color: 'Blanco',
        type: 'NEW',
      },
      {
        brand: 'Volkswagen',
        model: 'Amarok',
        price: 40000,
        images: ['amarok1.jpg', 'amarok2.jpg'],
        title: 'Volkswagen Amarok',
        category: 'Autos',
        description: 'Una potente camioneta pickup.',
        currentStock: 5,
        freeShipping: true,
        color: 'Gris',
        type: 'NEW',
      },
      {
        brand: 'Volkswagen',
        model: 'Gol',
        price: 18000,
        images: ['gol1.jpg', 'gol2.jpg'],
        title: 'Volkswagen Gol',
        category: 'Autos',
        description: 'Un clásico económico y confiable.',
        currentStock: 8,
        freeShipping: true,
        color: 'Rojo',
        type: 'NEW',
      },
      {
        brand: 'Ford',
        model: 'Mustang',
        price: 50000,
        images: ['mustang1.jpg', 'mustang2.jpg'],
        title: 'Ford Mustang',
        category: 'Autos',
        description: 'Un icónico automóvil deportivo.',
        currentStock: 3,
        freeShipping: false,
        color: 'Azul',
        type: 'NEW',
      },
      {
        brand: 'Ford',
        model: 'Focus',
        price: 22000,
        images: ['focus1.jpg', 'focus2.jpg'],
        title: 'Ford Focus',
        category: 'Autos',
        description: 'Un vehículo compacto y versátil.',
        currentStock: 6,
        freeShipping: true,
        color: 'Plata',
        type: 'NEW',
      },
      // Agrega aquí más productos de Volkswagen con diferentes modelos, colores y descripciones
    ];

    for (const productData of productsData) {
      try {
        const product = new this.productModel(productData);
        await product.save();
      } catch (error) {
        console.log(error)
      }
    }

    console.log('Productos creados exitosamente.');
  }
}

// orden:{
//   productocantidad:[
//     {
//       producto:"algo"
//       cantidad:1
//     }
//   ],
//   cliente: Cliente,
//   envio:boolean,
//   total: number,
//   descuento: number,
//   totalFilnal: number,
//   tipodepago: enum(efectivo, transferencia),
//   datecreated: Date,
//   datefinal: Date,
//   status:enum(aceptado,denegado)
// }