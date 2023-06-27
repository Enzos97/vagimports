import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) 
    private customerModel: Model<Customer>,
    private commonService: CommonService
  ){}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      console.log(createCustomerDto)
      const {fullName, email, dni, cuit, address, department=null, city, zipCode, country, province, paymentMethod } = createCustomerDto
  
      let findCustomerEmail = await this.customerModel.findOne({email})
      if(findCustomerEmail){
        findCustomerEmail.address=address
        findCustomerEmail.department=department
        findCustomerEmail.city=city
        findCustomerEmail.zipCode=zipCode
        findCustomerEmail.province=province
        findCustomerEmail.country=country
        findCustomerEmail.paymentMethod=paymentMethod
        await findCustomerEmail.save()
        return {customer:findCustomerEmail,message:'Existing customer updated'};
      }
  
      const newCustomer = await this.customerModel.create(createCustomerDto)
      
      console.log(newCustomer)
      return {customer:newCustomer,message:'New customer created'};
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findAll() {
    try {
      return await this.customerModel.find()
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string) {
    try {
      const customerRemoved = await this.customerModel.findByIdAndRemove(id)
      return {customer:customerRemoved,message:`This action removes a #${id} customer`};
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
}

