import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVersionModelDto } from './dto/create-version-model.dto';
import { UpdateVersionModelDto } from './dto/update-version-model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VersionModel } from './entities/version-model.entity';
import { Model } from 'mongoose';
import { ModelCarService } from 'src/model-car/model-car.service';
import { CommonService } from '../common/common.service';
import { AddProductToVersionDto } from './dto/addProduct.dto';

@Injectable()
export class VersionModelService {
  constructor(
    @InjectModel(VersionModel.name)
    private readonly versionModelModel:Model<VersionModel>,
    private readonly modelCarService:ModelCarService,
    private readonly commonService:CommonService
  ){

  }
  async create(createVersionModelDto: CreateVersionModelDto) {
    
    let {name,model} = createVersionModelDto

    let findModel = await this.modelCarService.findOne(model)

    if(!findModel){
      throw new NotFoundException('modelo no encontrado')
    }
    try {
      await this.findVersionInModel(model,name)
      
      model=findModel.id

      const newVersion = await this.versionModelModel.create(createVersionModelDto)

      findModel.versions.push(newVersion.id)
      findModel.markModified('versions');
      await findModel.save()
      
      return newVersion
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async addProduct(addProductDto:AddProductToVersionDto){
    const addProduct = await this.versionModelModel.findByIdAndUpdate(
      addProductDto.versionId,
      { $push: { products: addProductDto.productId} },
      { new: true },
    );
    return addProduct
  }
  async findAll() {
    try {
      const versions = await this.versionModelModel.find().populate('products')
      if(!versions.length){
        throw new NotFoundException('no hay versiones')
      }
      return versions
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findOne(id: string) {
      const version = await this.versionModelModel.findById(id)
      if(!version){
        throw new NotFoundException('la version no existe')
      } 
      return version
  }
  async findByName(name:string){
    try {
      const version = await this.versionModelModel.findOne({name})
      if(!version){
        throw new NotFoundException('la version no existe')
      }
      return version
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async update(id: string, updateVersionModelDto: UpdateVersionModelDto) {
    try {
      return await this.versionModelModel.findByIdAndUpdate(id,updateVersionModelDto,{new:true})
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.versionModelModel.findByIdAndRemove(id)
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  ///////////////////////////////helper///////////////////////////////////
  async findVersionInModel(model:string,name:string): Promise<boolean> {
    console.log('entreeeeeee',model);
    
    let findModel = await this.versionModelModel.findOne({name})
    console.log(findModel)
    if(!findModel){
      return true
    }
    if(findModel.model.toString() == model){
      let error= new BadRequestException('ya existe este modelo en esta marca')
      this.commonService.handleExceptions(error)
    }
    console.log(findModel);
    
    return
  }
}
