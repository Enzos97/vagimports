import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateModelCarDto } from './dto/create-model-car.dto';
import { UpdateModelCarDto } from './dto/update-model-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelCar } from './entities/model-car.entity';
import { Model } from 'mongoose';
import { BrandService } from 'src/brand/brand.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class ModelCarService {
  constructor(
    @InjectModel(ModelCar.name)
    private readonly modelCarModel: Model<ModelCar>,
    private readonly brandSrevice: BrandService,
    private readonly commonService: CommonService,
  ){}
  async create(createModelCarDto: CreateModelCarDto) {
    let {name,brand} = createModelCarDto
    let findBrand = await this.brandSrevice.findOne(brand)

    if(!findBrand){
      throw new NotFoundException('marca no encontrada')
    }
    try {
      await this.findModelInBrand(brand,name)
      
      brand=findBrand.id

      const newModel = await this.modelCarModel.create(createModelCarDto)

      findBrand.models.push(newModel.id)
      findBrand.markModified('models');
      await findBrand.save()
      
      return newModel
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findAll() {
    try {
      const allModels = await this.modelCarModel.find().populate('versions')
      return allModels
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findOne(id: string) {
    try {
      const findModel = await this.modelCarModel.findById(id).populate('versions')
      return findModel
    } catch (error) {
      this.commonService.handleExceptions(error)    
    }
  }

  async findByName(name:string){
    try {
      const model = await this.modelCarModel.findOne({name}).populate('versions')
      if(!model){
        throw new NotFoundException('el modelo no existe')
      }
      return model
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async update(id: string, updateModelCarDto: UpdateModelCarDto) {
    try {
      const findModel = await this.modelCarModel.findByIdAndUpdate(id,updateModelCarDto)
      return findModel
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      const findModel = await this.modelCarModel.findByIdAndRemove(id)
      return findModel
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  ///////////////helper
  async findModelInBrand(brand:string,name:string): Promise<boolean> {
    console.log('entreeeeeee',brand);
    
    let findModel = await this.modelCarModel.findOne({name})
    if(!findModel){
      return true
    }
    if(findModel.brand.toString() == brand){
      let error= new BadRequestException('ya existe este modelo en esta marca')
      this.commonService.handleExceptions(error)
    }
    console.log(findModel);
    
    return
  }
}
