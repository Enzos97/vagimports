import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMercadopagoDto } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';
import { item } from './interfaces/item.interface';
import mercadopago from 'mercadopago';

@Injectable()
export class MercadopagoService {
  constructor(){
    mercadopago.configure({
      access_token: 'TEST-4059758705683204-061414-0e3a38608c9d4fd7dfe24c829cd7f390-1391296620',
    })
  }

  async create(createMercadopagoDto: any) {
    const items = createMercadopagoDto.map(({ product, quantity }) => {
      const item: item = {
        title: product.title,
        quantity: quantity,
        currency_id: "ARS", // Cambia esto si usas una moneda diferente
        unit_price: product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price
      };
    
      return item;
    });
    console.log('items',items)
    const preference: any = {
      items: items,
      back_urls: {
        success: "http://localhost:3003/mercadopago/success",
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      const paymentLink = response.body.init_point;
      return paymentLink;
      //console.log(paymentLink)
    } catch (error) {
      // Manejar el error adecuadamente
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all mercadopago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mercadopago`;
  }

  update(id: number, updateMercadopagoDto: UpdateMercadopagoDto) {
    return `This action updates a #${id} mercadopago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercadopago`;
  }
}
