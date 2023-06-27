import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CategoryService } from 'src/category/category.service';
import { ModelCarService } from 'src/model-car/model-car.service';
import { VersionModelService } from 'src/version-model/version-model.service';
import { UploadImageService } from 'src/upload-image/upload-image.service';
import { Category } from 'src/category/entities/category.entity';
import { ModelCar } from 'src/model-car/entities/model-car.entity';
import { VersionModel } from 'src/version-model/entities/version-model.entity';
import axios from 'axios';
import cheerio from 'cheerio';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) 
    private productModel: Model<Product>,
    private commonService: CommonService,
    private categoryService: CategoryService,
    private modelCarService: ModelCarService,
    private versionModelService: VersionModelService,
    private uploadImageService:UploadImageService
  ){}
  async create(createProductDto: CreateProductDto) {
    try{
      const usdBlue = (await this.getCotizacionDolarBlue()).venta
      const arsPrice = (createProductDto.usdPrice*usdBlue)
      console.log(usdBlue,createProductDto.usdPrice*usdBlue,createProductDto.usdPrice, arsPrice,createProductDto.price)
      if(createProductDto.images){
        const uploadImages = await this.uploadImageService.uploadFiles(createProductDto.title,createProductDto.images)
        createProductDto.images=uploadImages.imageUrls
      }
      createProductDto.price= arsPrice
    
      const createdProduct = await this.productModel.create(createProductDto);

      const category:any = await this.categoryService.findOne(createProductDto.category);
      const modelcar:ModelCar = await this.modelCarService.findByName(createProductDto.model)
      const version:VersionModel = await this.versionModelService.findByName(createProductDto.version)

      console.log('category',category)
      if(!category){
        throw new NotFoundException('la categoria ingresada no existe')
      }
      if(!modelcar){
        throw new NotFoundException('el modelo ingresado no existe')
      }
      if(!version){
        throw new NotFoundException('la version ingresada no existe')
      }
      const categoryPush = await this.categoryService.addProduct({categoryId:category._id,productId:createdProduct.id})
      const versionPush = await this.versionModelService.addProduct({versionId:version._id,productId:createdProduct.id})
      console.log('categoyPush',categoryPush)
      console.log('versionPush',versionPush)
      return createdProduct;
    }catch(error){
      this.commonService.handleExceptions(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    try {
      const { limit = 10, offset = 0, category, brand, model, search, version, type, outstanding=false, freeShipping=false} = paginationDto;

      const query = this.productModel.find();

      if(category){
        query.where('category', category)
      }

      if (brand && model && version && type && outstanding) {
        query.where('brand', brand).where('model', model).where('version', version).where('type', type).where('outstanding', outstanding);
      } else if (brand && model && version && type) {
        query.where('brand', brand).where('model', model).where('version', version).where('type', type);
      } else if (brand && model && version && outstanding) {
        query.where('brand', brand).where('model', model).where('version', version).where('outstanding', version)
      }else if (brand && model && type && outstanding) {
        query.where('brand', brand).where('model', model).where('type', type).where('outstanding', version)
      } else if (brand && version && type && outstanding) {
        query.where('brand', brand).where('version', version).where('type', type).where('outstanding', version)
      } else if (model && version && type && outstanding) {
        query.where('model', model).where('version', version).where('type', type).where('outstanding', version)
      } else if (brand && model && version) {
        query.where('brand', brand).where('model', model).where('version', version)
      } else if (brand && model && type) {
        query.where('brand', brand).where('model', model).where('type', type);
      } else if (brand && version && type) {
        query.where('brand', brand).where('version', version).where('type', type);
      } else if (model && version && type) {
        query.where('model', model).where('version', version).where('type', type);
      } else if (brand && model && outstanding) {
        query.where('brand', brand).where('model', model).where('outstanding', outstanding);
      } else if (brand && outstanding && type) {
        query.where('brand', brand).where('outstanding', outstanding).where('type', type);
      } else if (brand && version && outstanding) {
        query.where('brand', brand).where('version', version).where('outstanding', outstanding);
      } else if (model && version && outstanding) {
        query.where('model', model).where('version', version).where('outstanding', outstanding);
      } else if (brand && model) {
        query.where('brand', brand).where('model', model)
      } else if (brand && version) {
        query.where('brand', brand).where('version', version)
      } else if (model && version) {
        query.where('model', model).where('version', version)
      } else if (brand && type) {
        query.where('brand', brand).where('type', type)
      } else if (type && version) {
        query.where('type', type).where('version', version)
      } else if (model && type) {
        query.where('model', model).where('type', type)
      }  else if (brand && outstanding) {
        query.where('brand', brand).where('outstanding', outstanding)
      } else if (outstanding && version) {
        query.where('outstanding', outstanding).where('version', version)
      } else if (model && outstanding) {
        query.where('model', model).where('outstanding', outstanding)
      } else if (type && outstanding) {
        query.where('type', type).where('outstanding', outstanding)
      } else if (brand) {
        query.where('brand', brand);
      } else if (model) {
        query.where('model', model);
      } else if (version) {
        query.where('version', version);
      } else if (type) {
        query.where('type', type);
      } else if (outstanding) {
        query.where('outstanding', outstanding);
      }

      
      if (freeShipping) {
        query.where('freeShipping', freeShipping);
      }

      if (search) {
        const caseSensitiveRegex = new RegExp("^" +search, "i");
        console.log('casesensitive',caseSensitiveRegex)
        query.or([
          { brand: { $regex: caseSensitiveRegex } },
          { model: { $regex: caseSensitiveRegex } },
          { category: { $regex: caseSensitiveRegex } },
          { version: { $regex: caseSensitiveRegex } },
          { title: { $regex: caseSensitiveRegex } },
          { description: { $regex: caseSensitiveRegex } },
          { type: { $regex: caseSensitiveRegex } }
        ]);
      }

      //const totalElements = await this.productModel.countDocuments(query).exec();
      let totalElements:number = await this.productModel.countDocuments(query).exec()
      let currentpage:number;
      let maxpages:number;
      let products;
      //await query
      //   .limit(limit)
      //   .skip(offset)
      //   .sort({ no: 1 })
      //   .exec();
        if (offset > 0) {
          products = await query
            .find()
            .limit(limit)
            .skip((offset - 1)*limit)
            .sort({ no: 1 })
        }
        if(totalElements>0){
          if(totalElements%limit==0){
            maxpages=totalElements/limit
            currentpage=offset==0?offset+1:offset
          }
            maxpages=totalElements/limit
            maxpages= Math.ceil(maxpages)
            currentpage=(offset>0?offset:offset+1)
        }
      // const maxpages = Math.ceil(totalElements / limit);
      // const currentpage = offset + 1;

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
      if(updateProductDto.images){
        const uploadImages = await this.uploadImageService.uploadFiles(updateProductDto.title,updateProductDto.images)
        updateProductDto.images=uploadImages.imageUrls
      }

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

  async getCotizacionDolarBlue() {
    try {
      const url = 'https://dolarhoy.com/i/cotizaciones/dolar-blue';
      const response = await axios.get(url);
      const html = response.data;

      const $ = cheerio.load(html);

      const compraElement = $('.iframe-cotizaciones__container .data__valores p').eq(0);
      const ventaElement = $('.iframe-cotizaciones__container .data__valores p').eq(1);

      const compra = parseFloat(compraElement.text());
      const venta = parseFloat(ventaElement.text());

      return { compra, venta };
    } catch (error) {
      throw error;
    }
  }

  async updatePriceFromDolarCotization(){
    const allProducts = await this.productModel.find()
    
      // Get the exchange rate for USD to your desired currency (e.g., ARS)
      const usdBlue = (await this.getCotizacionDolarBlue()).venta

      // Update the prices of each product based on the exchange rate
      const updatedProducts = allProducts.map(product => {
        // Calculate the new price in your desired currency
        const newPrice = product.usdPrice * usdBlue;

        // Round the new price to 2 decimal places
        const roundedPrice = Math.round(newPrice * 100) / 100;

        // Update the product's price field
        product.price = roundedPrice;

        return product;
      });

      try {
        // Save the updated products back to the database
        await Promise.all(updatedProducts.map(product => product.save()));
  
        return updatedProducts;
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