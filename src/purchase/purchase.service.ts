import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';
import { Model, Types } from 'mongoose';
import { Purchase } from './entities/purchase.entity';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from '../products/products.service';
import { ProductQuantity } from './interfaces/ProductQuantity.interface';


@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) 
    private purchaseModel: Model<Purchase>,
    private commonService: CommonService,
    private readonly customersService:CustomersService,
    private readonly productsService:ProductsService,
  ){}
  async create(createPurchaseDto: CreatePurchaseDto) {
    console.log('dtoOrder',createPurchaseDto)
    let productsWithDetails: ProductQuantity[] = [];
    let totalWithoutDiscount = 0;
    let totalWithDiscount = 0;

    const customer = await this.customersService.create(createPurchaseDto.Customer)
  
    for (const product of createPurchaseDto.products) {
      // Buscar el producto por su ID
      const productFromDB = await this.productsService.findOne(product.product);
      if (!productFromDB) {
        throw new Error(`Product with ID ${product.product} not found`);
      }
  
      // Crear un objeto ProductQuantity con el producto y la cantidad
      const productWithDetails: ProductQuantity = {
        product: productFromDB,
        quantity: product.quantity,
      };
  
      // Calcular el descuento adicional para este producto
      const additionalDiscount = productFromDB.discount || 0;
  
      // Actualizar el descuento del producto sumando el descuento adicional
      productWithDetails.product.discount = productWithDetails.product.discount + additionalDiscount;
  
      // Calcular el total sin descuento y el total con descuento para este producto
      const subtotalWithoutDiscount = product.quantity * productFromDB.price;
      const subtotalWithDiscount = subtotalWithoutDiscount * (1 - productWithDetails.product.discount / 100);
  
      // Sumar al total general
      totalWithoutDiscount += subtotalWithoutDiscount;
      totalWithDiscount += subtotalWithDiscount;
  
      // Agregar el producto con detalles al array
      productsWithDetails.push(productWithDetails);
    }
    console.log("productsWithDetails",productsWithDetails);
    console.log("totalWithoutDiscount",totalWithoutDiscount);
    console.log("totalWithDiscount",totalWithDiscount);
    //createPurchaseDto.Customer = customer.customer
    createPurchaseDto.Customer=customer.customer.id
    createPurchaseDto.products=productsWithDetails
    createPurchaseDto.totalWithDiscount=totalWithDiscount
    createPurchaseDto.totalWithOutDiscount=totalWithoutDiscount
    try {
      const newOrder = await this.purchaseModel.create(createPurchaseDto)
      // newOrder.customer=customer.customer
      // newOrder.products=productsWithDetails
      // newOrder.totalWithDiscount=totalWithoutDiscount
      // newOrder.totalWithOutDiscount=totalWithoutDiscount
      //await newOrder.save()
      console.log("newOrder",newOrder);
      return newOrder
    } catch (error) {
      this.commonService.handleExceptions(error)
    }

  }

  async findAll() {
    return await this.purchaseModel.find().populate('Customer');
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
