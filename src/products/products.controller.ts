import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query()paginationDto:PaginationDto) {
    console.log(paginationDto);
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('cotizaciones/dolar-blue')
  getCotizacionDolarBlue() {
    return this.productsService.getCotizacionDolarBlue()
  }

  @Get('cotizaciones/producto')
  updateCotizacionDolarBlueProducto() {
    return this.productsService.updatePriceFromDolarCotization()
  }

  @Patch(':id')
  update(@Param('id',MongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id',MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
  //Helpers 
  //crea volksvagen
  @Get('new/vw')
  createVwCars(){
    return this.productsService.createProducts()
  }
}