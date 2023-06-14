import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { CreateMercadopagoDto } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';
import mercadopago from 'mercadopago';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(
    private readonly mercadopagoService:MercadopagoService
  ) {
      mercadopago.configure({
        access_token: 'TEST-4059758705683204-061414-0e3a38608c9d4fd7dfe24c829cd7f390-1391296620',
      })
    }
  @Get()
  async realizarPago() {
    const items = [
      {
        title: 'Producto 1',
        quantity: 2,
        currency_id: 'ARS',
        unit_price: 100,
      },
      {
        title: 'Producto 2',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 560.67,
      },
    ];

    const preference: any = {
      items: items,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      const paymentLink = response.body.init_point;
      return paymentLink;
    } catch (error) {
      // Manejar el error adecuadamente
      throw new BadRequestException(error.message);
    }
  }
  @Get('prueba')
  create(createMercadopagoDto: CreateMercadopagoDto){
    return this.mercadopagoService.create(createMercadopagoDto)
  }
  @Get('success')
  success(){
    return 'Gracias por su compra, en breve le enviaremos un mail'
  }
}
//   @Post()
//   create(@Body() createMercadopagoDto: CreateMercadopagoDto) {
//     return this.mercadopagoService.create(createMercadopagoDto);
//   }

//   @Get()
//   findAll() {
//     return this.mercadopagoService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.mercadopagoService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMercadopagoDto: UpdateMercadopagoDto) {
//     return this.mercadopagoService.update(+id, updateMercadopagoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.mercadopagoService.remove(+id);
//   }
// }
