import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';
import { Model, Types } from 'mongoose';
import { Purchase } from './entities/purchase.entity';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from '../products/products.service';
import { ProductQuantity } from './interfaces/ProductQuantity.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SortDirection } from 'src/types/sort.type';
import { StatusList, StatusTypes } from './types/StatusTypes.type';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { PaymentMethod } from 'src/customers/types/TypePayment.type';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) 
    private purchaseModel: Model<Purchase>,
    private commonService: CommonService,
    private readonly customersService:CustomersService,
    private readonly productsService:ProductsService,
    private readonly mercadopagoService:MercadopagoService,
    private readonly mailService:MailService
  ){}
  async create(createPurchaseDto: CreatePurchaseDto) {
    console.log('dtoOrder',createPurchaseDto)
    let productsWithDetails: ProductQuantity[] = [];
    let totalWithoutDiscount = 0;
    let totalWithDiscount = 0;

    const customerEmail = createPurchaseDto.Customer.email 
    const code = this.generateCode()
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

    createPurchaseDto.Customer=customer.customer.id
    createPurchaseDto.products=productsWithDetails
    createPurchaseDto.totalWithDiscount=totalWithDiscount
    createPurchaseDto.totalWithOutDiscount=totalWithoutDiscount

    try {
      const newOrder = await this.purchaseModel.create(createPurchaseDto)
      console.log("newOrder",newOrder);
      if(newOrder.payType==PaymentMethod.MERCADOPAGO){
        let linkMP = await this.mercadopagoService.create(newOrder.products)
        await this.setCodeOnPurchase(newOrder.id,code)
        await this.mailService.send_code_mail(customerEmail,newOrder.id,code)
        return {orden:newOrder, linkMP:linkMP }
      }
      await this.setCodeOnPurchase(newOrder.id,code)
      await this.mailService.send_code_mail(customerEmail,newOrder.id,code)
      return newOrder
    } catch (error) {
      this.commonService.handleExceptions(error)
    }

  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0, orderDate, totalWithOutDiscount, status } = paginationDto;
  
      const query = this.purchaseModel.find().populate('Customer');
  
      if (orderDate&&status) {
        query.sort({ orderDate: SortDirection[orderDate] }).where('status', status);
      }
      else if (totalWithOutDiscount&&status) {
        query.sort({ totalWithOutDiscount: SortDirection[totalWithOutDiscount] }).where('status', status);
      }
      else if (orderDate) {
        query.sort({ orderDate: SortDirection[orderDate] });
      }
      else if (totalWithOutDiscount) {
        query.sort({ totalWithOutDiscount: SortDirection[totalWithOutDiscount] });
      }
      else if (status) {
        query.where('status', status);
      }
  
      const totalElements = await this.purchaseModel.countDocuments(query).exec();
  
      query.limit(limit).skip(offset);
  
      const orders = await query.populate('Customer').exec();
  
      const maxpages = Math.ceil(totalElements / limit);
      const currentpage = Math.floor(offset / limit) + 1;
  
      return {
        orders,
        totalElements,
        maxpages,
        currentpage,
      };
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.purchaseModel.findById(id) 
      if(!order){
        throw new NotFoundException('la orden no existe.')
      }
      return order.populate('Customer')
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    try {
      if(updatePurchaseDto.state===StatusTypes.ACCEPTED){
        const purchase = await this.purchaseModel.findById(id).populate('products.product');

        if (purchase) {
          const productsToUpdate = purchase.products;
  
          for (const productToUpdate of productsToUpdate) {
            const productId = productToUpdate.product._id;
            const quantityToUpdate = productToUpdate.quantity;
  
            const product = await this.productsService.findOne(productId);
  
            if (product) {
              product.currentStock -= quantityToUpdate;
              await product.save();
            }
          }
        }
      }
      const updateStatus = await this.purchaseModel.findByIdAndUpdate(id, updatePurchaseDto, { new: true })
      return updateStatus;
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.purchaseModel.findByIdAndRemove(id).exec();
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async setCodeOnPurchase(id:string,code:number){
    return await this.purchaseModel.findByIdAndUpdate(id,{tokenClient:code},{new:true})
  }

  ///////////////////Client Actions//////////////////////////////
  async getPurchaseClient(code:string){
    const findOrder = await this.purchaseModel.findOne({tokenClient:code})
    if(!findOrder){
      throw new NotFoundException('codigo ingresado incorreto.')
    }
    return findOrder
  }
  async uploadPurchaseClient(id:string,updatePurchaseDto:UpdatePurchaseDto){
    try {
      console.log(id,updatePurchaseDto)
      const uploadorder = await this.purchaseModel.findByIdAndUpdate(id,updatePurchaseDto,{new:true})
      console.log((uploadorder));
      
      return uploadorder
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  ////////////////////////////////Helper/////////////////////////
  generateCode(){
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);  
    return code
  }
}