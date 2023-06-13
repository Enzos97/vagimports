import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdatePruebaDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly pruebaService: BrandService) {}

  @Post()
  create(@Body() createPruebaDto: CreateBrandDto) {
    return this.pruebaService.create(createPruebaDto);
  }

  @Get()
  findAll(
    @Query('marca') marca:string,
  ) {
    return this.pruebaService.findAll(marca);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebaService.findOne(+id);
  }

  @Get('prueba/crearMarcas')
  crearMarcas(createPruebaDto: CreateBrandDto) {
    return this.pruebaService.createBrands(createPruebaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruebaDto: UpdatePruebaDto) {
    return this.pruebaService.update(+id, updatePruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebaService.remove(+id);
  }
}
