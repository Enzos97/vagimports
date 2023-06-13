import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdatePruebaDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './entities/brand.entity';
import { Model } from 'mongoose';
import { brands } from './helpers/brands-json';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private brandModel:Model<Brand>
  ){}
  async create(createPruebaDto: CreateBrandDto) {

    return await this.brandModel.create(createPruebaDto);
  }

  async findAll(marca:string) {
    if(marca){
      const modelos = await this.brandModel.findOne({name:marca})
      return modelos.models
    }
    const marcas = await this.brandModel.find()
    return marcas
  }

  findOne(id: number) {
    return `This action returns a #${id} prueba`;
  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return `This action updates a #${id} prueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} prueba`;
  }
  //////////////////////////
  async createBrands(createBrandDto: CreateBrandDto) {
    const brandsArray = []; // Matriz para almacenar las marcas

    // Recorre cada elemento del JSON y crea un objeto CreateBrandDto
    for (const brand of brands) {
      const createBrandDto: CreateBrandDto = {
        name: brand.nombre,
        models: []
      };

      // Recorre cada modelo del JSON y añádelo a la propiedad models del objeto CreateBrandDto
      for (const model of brand.modelos) {
        if (brand.modelos && brand.modelos.length > 0) {
          createBrandDto.models.push({ model: model.modelo.toLowerCase() });
        }
      }

      // Crea la marca utilizando this.brandModel.create
      const createdBrand = await this.brandModel.create(createBrandDto);

      // Agrega la marca creada a la matriz de marcas
      brandsArray.push(createdBrand);
    }

    // Realiza cualquier acción adicional con las marcas creadas
    console.log(brandsArray);

    // Devuelve una respuesta adecuada según tu caso de uso
    return 'Marcas creadas exitosamente';
  }
}
